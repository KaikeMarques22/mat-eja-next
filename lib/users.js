import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import {
  BCRYPT_ROUNDS,
  getConquistasCatalogo,
  getStore,
  getTemas,
} from './store';
import { getSessionTokenFromCookies, setSessionCookie } from './session';
import { createSignedSessionToken, parseSignedSessionToken } from './session-token';

const INCREMENTO_EXERCICIO = 10;

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
  const user = store.users.find((u) => u.id === usuarioId && u.ativo);
  if (!user) return null;

  const token = createSignedSessionToken(user);
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

  const payload = parseSignedSessionToken(token);
  if (!payload) return null;

  const store = getStore();
  const user = store.users.find((u) => u.id === payload.userId && u.ativo);

  if (user) {
    return {
      id: user.id,
      nome: user.nome_completo,
      ra: user.ra,
      criadoEm: user.criado_em,
    };
  }

  if (payload.ra && payload.nome) {
    return {
      id: payload.userId,
      nome: payload.nome,
      ra: payload.ra,
      criadoEm: null,
    };
  }

  return null;
}

export async function revokeSession() {
  // Sessão é validada pelo cookie assinado; logout limpa o cookie no cliente.
}

function getProgressoOverridesFromToken(token) {
  const payload = parseSignedSessionToken(token);
  return payload?.progresso ?? {};
}

function percentualTema(usuarioId, tema, store, overrides) {
  const registro = store.progresso_tema.find(
    (p) => p.usuario_id === usuarioId && p.tema_id === tema.id
  );
  const noStore = registro?.percentual ?? 0;
  const noCookie = overrides[tema.slug] ?? 0;
  return Math.max(noStore, noCookie);
}

export async function aumentarProgressoPorExercicio(usuarioId, temaSlug) {
  const tema = getTemas().find((t) => t.slug === temaSlug);
  if (!tema) {
    return { ok: false, message: 'Matéria não encontrada.' };
  }

  const store = getStore();
  initProgressForUser(usuarioId);

  const token = await getSessionTokenFromCookies();
  const payload = parseSignedSessionToken(token);
  if (!payload || payload.userId !== usuarioId) {
    return { ok: false, message: 'Sessão inválida.' };
  }

  const overrides = { ...(payload.progresso ?? {}) };
  const atual = Math.max(
    percentualTema(usuarioId, tema, store, overrides),
    overrides[temaSlug] ?? 0
  );
  const novo = Math.min(100, atual + INCREMENTO_EXERCICIO);

  const registro = store.progresso_tema.find(
    (p) => p.usuario_id === usuarioId && p.tema_id === tema.id
  );
  if (registro) {
    registro.percentual = novo;
  } else {
    store.progresso_tema.push({
      usuario_id: usuarioId,
      tema_id: tema.id,
      percentual: novo,
    });
  }

  overrides[temaSlug] = novo;

  const user = store.users.find((u) => u.id === usuarioId && u.ativo);
  await setSessionCookie(
    createSignedSessionToken(
      user ?? {
        id: usuarioId,
        ra: payload.ra,
        nome: payload.nome,
      },
      overrides
    )
  );

  return { ok: true, percentual: novo, incremento: INCREMENTO_EXERCICIO };
}

export async function getProgressoGeral(usuarioId) {
  const temas = getTemas();
  if (temas.length === 0) return 0;

  const store = getStore();
  const token = await getSessionTokenFromCookies();
  const overrides = getProgressoOverridesFromToken(token);

  const total = temas.reduce(
    (sum, tema) => sum + percentualTema(usuarioId, tema, store, overrides),
    0
  );

  return Math.round(total / temas.length);
}

export async function getProgressoPorTema(usuarioId) {
  const store = getStore();
  const token = await getSessionTokenFromCookies();
  const overrides = getProgressoOverridesFromToken(token);

  return getTemas()
    .slice()
    .sort((a, b) => a.ordem - b.ordem)
    .map((tema) => ({
      slug: tema.slug,
      titulo: tema.titulo,
      progresso: percentualTema(usuarioId, tema, store, overrides),
      disponivel: tema.disponivel,
    }));
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
