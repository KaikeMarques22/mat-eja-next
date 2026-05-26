'use server';

import { redirect } from 'next/navigation';
import { revokeSession } from '../../../lib/users';
import { clearSessionCookie, getSessionTokenFromCookies } from '../../../lib/session';

export async function logoutAction() {
  try {
    const token = await getSessionTokenFromCookies();
    await revokeSession(token);
  } catch (error) {
    console.error('logoutAction:', error);
  }

  await clearSessionCookie();
  redirect('/login');
}
