import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const BCRYPT_ROUNDS = 12;
const SENHA123_HASH = bcrypt.hashSync('senha123', BCRYPT_ROUNDS);
const SENHA_MARQUES_HASH = bcrypt.hashSync('marques123', BCRYPT_ROUNDS);

const TEMAS = [
  {
    id: 'tema-pitagoras',
    slug: 'pitagoras',
    titulo: 'Teorema de Pitágoras',
    ordem: 1,
    disponivel: true,
  },
  {
    id: 'tema-equacao-2-grau',
    slug: 'equacao-2-grau',
    titulo: 'Equação do 2º grau',
    ordem: 2,
    disponivel: true,
  },
  {
    id: 'tema-geometria',
    slug: 'geometria-basica',
    titulo: 'Geometria básica',
    ordem: 3,
    disponivel: false,
  },
  {
    id: 'tema-fracoes',
    slug: 'fracoes',
    titulo: 'Frações e decimais',
    ordem: 4,
    disponivel: false,
  },
];

const CONQUISTAS = [
  {
    id: 'conq-primeiro-acesso',
    titulo: 'Primeiro passo',
    descricao: 'Entrou na plataforma pela primeira vez.',
  },
  {
    id: 'conq-pitagoras',
    titulo: 'Explorador de Pitágoras',
    descricao: 'Iniciou os estudos sobre o teorema de Pitágoras.',
  },
];

function createSeedUsers() {
  const mariaId = randomUUID();
  const joaoId = randomUUID();
  const marquesId = randomUUID();

  return [
    {
      id: mariaId,
      nome_completo: 'Maria Silva',
      ra: '12345',
      senha_hash: SENHA123_HASH,
      ativo: true,
      criado_em: new Date('2025-01-15T10:00:00.000Z'),
    },
    {
      id: joaoId,
      nome_completo: 'João Santos',
      ra: '67890',
      senha_hash: SENHA123_HASH,
      ativo: true,
      criado_em: new Date('2025-02-20T14:30:00.000Z'),
    },
    {
      id: marquesId,
      nome_completo: 'Marques',
      ra: 'MARQUES',
      senha_hash: SENHA_MARQUES_HASH,
      ativo: true,
      criado_em: new Date('2025-03-10T08:00:00.000Z'),
    },
  ];
}

function createSeedProgresso(users) {
  const [maria, joao, marques] = users;
  return [
    { usuario_id: maria.id, tema_id: 'tema-pitagoras', percentual: 45 },
    { usuario_id: maria.id, tema_id: 'tema-equacao-2-grau', percentual: 20 },
    { usuario_id: maria.id, tema_id: 'tema-geometria', percentual: 0 },
    { usuario_id: maria.id, tema_id: 'tema-fracoes', percentual: 0 },
    { usuario_id: joao.id, tema_id: 'tema-pitagoras', percentual: 47 },
    { usuario_id: joao.id, tema_id: 'tema-equacao-2-grau', percentual: 56 },
    { usuario_id: joao.id, tema_id: 'tema-geometria', percentual: 0 },
    { usuario_id: joao.id, tema_id: 'tema-fracoes', percentual: 0 },
    { usuario_id: marques.id, tema_id: 'tema-pitagoras', percentual: 47 },
    { usuario_id: marques.id, tema_id: 'tema-equacao-2-grau', percentual: 80 },
    { usuario_id: marques.id, tema_id: 'tema-geometria', percentual: 0 },
    { usuario_id: marques.id, tema_id: 'tema-fracoes', percentual: 0 },
  ];
}

function createSeedConquistas(users) {
  const [maria, , marques] = users;
  return [
    {
      usuario_id: maria.id,
      conquista_id: 'conq-primeiro-acesso',
      obtida_em: new Date('2025-01-15T10:05:00.000Z'),
    },
    {
      usuario_id: maria.id,
      conquista_id: 'conq-pitagoras',
      obtida_em: new Date('2025-01-16T09:00:00.000Z'),
    },
    {
      usuario_id: marques.id,
      conquista_id: 'conq-primeiro-acesso',
      obtida_em: new Date('2025-03-10T08:05:00.000Z'),
    },
    {
      usuario_id: marques.id,
      conquista_id: 'conq-pitagoras',
      obtida_em: new Date('2025-03-11T10:00:00.000Z'),
    },
  ];
}

function createEmptyStore() {
  const users = createSeedUsers();
  return {
    users,
    sessoes: [],
    tentativas_login: [],
    progresso_tema: createSeedProgresso(users),
    usuario_conquistas: createSeedConquistas(users),
  };
}

export function getStore() {
  if (!globalThis.matEjaStore) {
    globalThis.matEjaStore = createEmptyStore();
  }
  return globalThis.matEjaStore;
}

export function getTemas() {
  return TEMAS;
}

export function getConquistasCatalogo() {
  return CONQUISTAS;
}

export { BCRYPT_ROUNDS };
