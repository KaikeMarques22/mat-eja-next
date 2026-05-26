'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from './actions';

const initialState = {
  ok: false,
  message: '',
  errors: {
    nome: '',
    ra: '',
    senha: '',
    confirmar: '',
  },
};

function fieldClass(hasError) {
  return `mb-5 w-full rounded border-2 px-3 py-2 text-xl outline-none ring-0 focus:border-sky-600 ${
    hasError ? 'border-rose-500' : 'border-slate-700'
  }`;
}

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form
      action={formAction}
      className="mt-8 w-full max-w-xl rounded-xl border-2 border-slate-900 bg-white/90 p-6 shadow-2xl"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
        Criar conta
      </h2>

      <label className="mb-2 block text-lg font-semibold text-slate-900" htmlFor="nome">
        Nome completo
      </label>
      <input
        id="nome"
        name="nome"
        type="text"
        className={fieldClass(state?.errors?.nome)}
        placeholder="Seu nome"
        autoComplete="name"
      />
      {state?.errors?.nome ? (
        <p className="-mt-4 mb-4 text-sm font-medium text-rose-700">{state.errors.nome}</p>
      ) : null}

      <label className="mb-2 block text-lg font-semibold text-slate-900" htmlFor="ra">
        RA (seu identificador de aluno)
      </label>
      <input
        id="ra"
        name="ra"
        type="text"
        className={fieldClass(state?.errors?.ra)}
        placeholder="Ex.: 2026001"
        autoComplete="username"
      />
      {state?.errors?.ra ? (
        <p className="-mt-4 mb-4 text-sm font-medium text-rose-700">{state.errors.ra}</p>
      ) : (
        <p className="-mt-4 mb-4 text-xs text-slate-500">
          Você escolhe o RA. Deve ser único na plataforma.
        </p>
      )}

      <label className="mb-2 block text-lg font-semibold text-slate-900" htmlFor="senha">
        Senha
      </label>
      <input
        id="senha"
        name="senha"
        type="password"
        className={fieldClass(state?.errors?.senha)}
        placeholder="Mínimo 6 caracteres"
        autoComplete="new-password"
      />
      {state?.errors?.senha ? (
        <p className="-mt-4 mb-4 text-sm font-medium text-rose-700">{state.errors.senha}</p>
      ) : null}

      <label className="mb-2 block text-lg font-semibold text-slate-900" htmlFor="confirmar">
        Confirmar senha
      </label>
      <input
        id="confirmar"
        name="confirmar"
        type="password"
        className={fieldClass(state?.errors?.confirmar)}
        placeholder="Repita a senha"
        autoComplete="new-password"
      />
      {state?.errors?.confirmar ? (
        <p className="-mt-4 mb-4 text-sm font-medium text-rose-700">
          {state.errors.confirmar}
        </p>
      ) : null}

      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded border-2 border-slate-900 bg-blue-600 px-10 py-3 text-xl font-semibold text-white transition hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </div>
      {state?.message ? (
        <p
          className={`mt-4 rounded-lg px-4 py-3 text-center text-sm font-medium ${
            state.ok ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <p className="mt-6 text-center text-slate-700">
        Já tem conta?{' '}
        <Link href="/login" className="font-semibold text-blue-600 underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
