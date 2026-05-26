'use server';

import { redirect } from 'next/navigation';
import { loginUser } from '../../lib/users';

export async function loginAction(prevState, formData) {
  const nome = formData.get('nome')?.toString().trim() ?? '';
  const ra = formData.get('ra')?.toString().trim() ?? '';
  const senha = formData.get('senha')?.toString() ?? '';

  const errors = {
    nome: '',
    ra: '',
    senha: '',
  };

  if (!nome) errors.nome = 'Por favor, informe seu nome completo.';
  if (!ra) errors.ra = 'Por favor, informe seu RA.';
  if (!senha) errors.senha = 'Por favor, informe sua senha.';

  if (errors.nome || errors.ra || errors.senha) {
    return {
      ok: false,
      message: 'Corrija os campos antes de acessar.',
      errors,
    };
  }

  try {
    const result = await loginUser({ ra, senha });
    if (!result.ok) {
      return {
        ok: false,
        message: result.message,
        errors: { nome: '', ra: '', senha: '' },
      };
    }
  } catch (error) {
    console.error('loginAction:', error);
    return {
      ok: false,
      message: 'Não foi possível entrar. Tente novamente em instantes.',
      errors: { nome: '', ra: '', senha: '' },
    };
  }

  redirect('/perfil');
}
