'use server';

import { getSessionUser } from '../../../lib/auth';
import { aumentarProgressoPorExercicio } from '../../../lib/users';

export async function registrarCorrecaoExercicioAction(temaSlug) {
  const user = await getSessionUser();
  if (!user) {
    return { ok: false, message: 'Faça login para registrar seu progresso.' };
  }

  return aumentarProgressoPorExercicio(user.id, temaSlug);
}
