import { createHmac, timingSafeEqual } from 'crypto';
import { getSessionMaxAgeSeconds } from './session';

function getSecret() {
  return process.env.SESSION_SECRET || 'dev-only-change-in-production';
}

function sign(payloadB64) {
  return createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
}

export function createSignedSessionToken(user) {
  const exp = Date.now() + getSessionMaxAgeSeconds() * 1000;
  const payload = JSON.stringify({
    userId: user.id,
    ra: user.ra,
    nome: user.nome_completo,
    exp,
  });
  const payloadB64 = Buffer.from(payload, 'utf8').toString('base64url');
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function parseSignedSessionToken(token) {
  if (!token || !token.includes('.')) return null;

  const dot = token.lastIndexOf('.');
  const payloadB64 = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payloadB64);

  try {
    const sigBuf = Buffer.from(signature, 'base64url');
    const expBuf = Buffer.from(expected, 'base64url');
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    );
    if (!payload?.userId || !payload?.exp || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
