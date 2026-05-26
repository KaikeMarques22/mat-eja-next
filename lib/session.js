import { createHash, randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'eja_session';

const MAX_AGE_DAYS = Number(process.env.SESSION_MAX_AGE_DAYS || 7);

export function generateSessionToken() {
  return randomBytes(32).toString('hex');
}

export function hashSessionToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export function getSessionMaxAgeSeconds() {
  return MAX_AGE_DAYS * 24 * 60 * 60;
}

export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getSessionMaxAgeSeconds(),
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}
