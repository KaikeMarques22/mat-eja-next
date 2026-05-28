'use server';

import { redirect } from 'next/navigation';
import { revokeSession } from '../../../lib/users';
import { clearSessionCookie } from '../../../lib/session';

export async function logoutAction() {
  try {
    await revokeSession();
  } catch (error) {
    console.error('logoutAction:', error);
  }

  await clearSessionCookie();
  redirect('/login');
}
