import { redirect } from 'next/navigation';
import { getSessionTokenFromCookies } from './session';
import { getUserBySessionToken } from './users';

export async function getSessionUser() {
  try {
    const token = await getSessionTokenFromCookies();
    const user = await getUserBySessionToken(token);
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return user;
}
