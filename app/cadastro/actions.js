'use server';

import { redirect } from 'next/navigation';
import { registerUser } from '../../lib/users';

export async function registerAction(prevState, formData) {
  const nome = formData.get('nome')?.toString() ?? '';
  const ra = formData.get('ra')?.toString() ?? '';
  const senha = formData.get('senha')?.toString() ?? '';
  const confirmar = formData.get('confirmar')?.toString() ?? '';

  const errors = {
    nome: '',
    ra: '',
    senha: '',
    confirmar: '',
  };

  if (!nome.trim()) errors.nome = 'Informe seu nome.';
  if (!ra.trim()) errors.ra = 'Escolha um RA para sua conta.';
  if (!senha) errors.senha = 'Crie uma senha.';
  if (!confirmar) errors.confirmar = 'Confirme a senha.';

  if (senha && confirmar && senha !== confirmar) {
    errors.confirmar = 'As senhas não coincidem.';
  }

  if (errors.nome || errors.ra || errors.senha || errors.confirmar) {
    return {
      ok: false,
      message: 'Corrija os campos destacados.',
      errors,
    };
  }

  try {
    const result = await registerUser({ nome, ra, senha });
    if (!result.ok) {
      return {
        ok: false,
        message: result.message,
        errors: { nome: '', ra: '', senha: '', confirmar: '' },
      };
    }
  } catch (error) {
    console.error('registerAction:', error);
    return {
      ok: false,
      message: 'Não foi possível cadastrar. Tente novamente em instantes.',
      errors: { nome: '', ra: '', senha: '', confirmar: '' },
    };
  }

  redirect('/perfil');
}
