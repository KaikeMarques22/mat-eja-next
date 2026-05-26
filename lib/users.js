import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import {
  BCRYPT_ROUNDS,
  getConquistasCatalogo,
  getStore,
  getTemas,
} from './store';
import {
  generateSessionToken,
  hashSessionToken,
  setSessionCookie,
} from './session';

const LOGIN_MAX_ATTEMPTS = Number(process.env.LOGIN_MAX_ATTEMPTS || 5);
const LOCKOUT_MINUTES = 15;

function normalizeRa(ra) {
  return ra.trim().toUpperCase();
}

function normalizeNome(nome) {
  return nome.trim().replace(/\s+/g, ' ');
}

export async function getRequestMeta() {
  const { headers } = await import('next/headers');
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || null;
  const userAgent = h.get('user-agent')?.slice(0, 512) || null;
  return { ip, userAgent };
}

function logLoginAttempt(ra, sucesso, motivoFalha, ip, userAgent) {
  const store = getStore();
  store.tentativas_login.push({
    ra_informado: ra,
    sucesso,
    motivo_falha: motivoFalha,
    ip_origem: ip,
    user_agent: userAgent,
    tentativa_em: new Date(),
  });
}

function countRecentFailures(ra) {
  const store = getStore();
  const cutoff = Date.now() - LOCKOUT_MINUTES * 60 * 1000;
  return store.tentativas_login.filter(
    (t) =>
      t.ra_informado === ra &&
      !t.sucesso &&
      t.tentativa_em.getTime() > cutoff
  ).length;
}

async function createSessionForUser(usuarioId, ip, userAgent) {
  const store = getStore();
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const maxDays = Number(process.env.SESSION_MAX_AGE_DAYS || 7);
  const expiraEm = new Date(Date.now() + maxDays * 24 * 60 * 60 * 1000);

  store.sessoes.push({
    usuario_id: usuarioId,
    token_hash: tokenHash,
    expira_em: expiraEm,
    ip_origem: ip,
    user_agent: userAgent,
    revogada: false,
  });

  await setSessionCookie(token);
  return token;
}

function initProgressForUser(usuarioId) {
  const store = getStore();
  for (const tema of getTemas()) {
    const exists = store.progresso_tema.some(
      (p) => p.usuario_id === usuarioId && p.tema_id === tema.id
    );
    if (!exists) {
      store.progresso_tema.push({
        usuario_id: usuarioId,
        tema_id: tema.id,
        percentual: 0,
      });
    }
  }
}

export async function registerUser({ nome, ra, senha }) {
  const nomeNorm = normalizeNome(nome);
  const raNorm = normalizeRa(ra);

  if (nomeNorm.length < 3) {
    return { ok: false, message: 'Informe um nome com pelo menos 3 caracteres.' };
  }
  if (!/^[A-Z0-9._-]{1,32}$/i.test(raNorm)) {
    return {
      ok: false,
      message: 'RA inválido. Use letras, números, ponto, hífen ou sublinhado.',
    };
  }
  if (senha.length < 6) {
    return { ok: false, message: 'A senha deve ter no mínimo 6 caracteres.' };
  }

  const store = getStore();
  const exists = store.users.some((u) => u.ra === raNorm);
  if (exists) {
    return { ok: false, message: 'Este RA já está cadastrado. Faça login ou escolha outro.' };
  }

  const senhaHash = await bcrypt.hash(senha, BCRYPT_ROUNDS);
  const usuarioId = randomUUID();

  store.users.push({
    id: usuarioId,
    nome_completo: nomeNorm,
    ra: raNorm,
    senha_hash: senhaHash,
    ativo: true,
    criado_em: new Date(),
  });

  initProgressForUser(usuarioId);

  const { ip, userAgent } = await getRequestMeta();
  await createSessionForUser(usuarioId, ip, userAgent);
  logLoginAttempt(raNorm, true, null, ip, userAgent);

  return { ok: true };
}

export async function loginUser({ ra, senha }) {
  const raNorm = normalizeRa(ra);
  const { ip, userAgent } = await getRequestMeta();

  const failures = countRecentFailures(raNorm);
  if (failures >= LOGIN_MAX_ATTEMPTS) {
    logLoginAttempt(raNorm, false, 'bloqueio_temporario', ip, userAgent);
    return {
      ok: false,
      message: `Muitas tentativas. Aguarde ${LOCKOUT_MINUTES} minutos e tente de novo.`,
    };
  }

  const store = getStore();
  const user = store.users.find((u) => u.ra === raNorm && u.ativo);
  if (!user) {
    logLoginAttempt(raNorm, false, 'credenciais_invalidas', ip, userAgent);
    return { ok: false, message: 'RA ou senha incorretos.' };
  }

  const senhaOk = await bcrypt.compare(senha, user.senha_hash);
  if (!senhaOk) {
    logLoginAttempt(raNorm, false, 'credenciais_invalidas', ip, userAgent);
    return { ok: false, message: 'RA ou senha incorretos.' };
  }

  await createSessionForUser(user.id, ip, userAgent);
  logLoginAttempt(raNorm, true, null, ip, userAgent);
  return { ok: true };
}

export async function getUserBySessionToken(token) {
  if (!token) return null;

  const store = getStore();
  const tokenHash = hashSessionToken(token);
  const now = Date.now();

  const session = store.sessoes.find(
    (s) =>
      s.token_hash === tokenHash &&
      !s.revogada &&
      s.expira_em.getTime() > now
  );
  if (!session) return null;

  const user = store.users.find((u) => u.id === session.usuario_id && u.ativo);
  if (!user) return null;

  return {
    id: user.id,
    nome: user.nome_completo,
    ra: user.ra,
    criadoEm: user.criado_em,
  };
}

export async function revokeSession(token) {
  if (!token) return;

  const store = getStore();
  const tokenHash = hashSessionToken(token);
  for (const session of store.sessoes) {
    if (session.token_hash === tokenHash) {
      session.revogada = true;
    }
  }
}

export async function getProgressoGeral(usuarioId) {
  const temas = getTemas();
  if (temas.length === 0) return 0;

  const store = getStore();
  const total = temas.reduce((sum, tema) => {
    const progresso = store.progresso_tema.find(
      (p) => p.usuario_id === usuarioId && p.tema_id === tema.id
    );
    return sum + (progresso?.percentual ?? 0);
  }, 0);

  return Math.round(total / temas.length);
}

export async function getProgressoPorTema(usuarioId) {
  const store = getStore();

  return getTemas()
    .slice()
    .sort((a, b) => a.ordem - b.ordem)
    .map((tema) => {
      const progresso = store.progresso_tema.find(
        (p) => p.usuario_id === usuarioId && p.tema_id === tema.id
      );
      return {
        slug: tema.slug,
        titulo: tema.titulo,
        progresso: progresso?.percentual ?? 0,
        disponivel: tema.disponivel,
      };
    });
}

export async function getConquistasUsuario(usuarioId) {
  const store = getStore();
  const catalogo = getConquistasCatalogo();

  return store.usuario_conquistas
    .filter((uc) => uc.usuario_id === usuarioId)
    .sort((a, b) => b.obtida_em.getTime() - a.obtida_em.getTime())
    .map((uc) => {
      const conquista = catalogo.find((c) => c.id === uc.conquista_id);
      return {
        titulo: conquista?.titulo ?? 'Conquista',
        descricao: conquista?.descricao ?? '',
      };
    });
}
