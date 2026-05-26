'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

const initialState = {
  ok: false,
  message: '',
  errors: {
    nome: '',
    ra: '',
    senha: '',
  },
};

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form
      id="loginForm"
      action={formAction}
      className="mt-10 w-full max-w-xl rounded-xl border-2 border-slate-900 bg-white/85 p-6 shadow-2xl"
    >
      <label className="mb-2 block text-3xl font-semibold text-slate-900" htmlFor="nome">
        Nome completo:
      </label>
      <input
        className={`mb-5 w-full rounded border-2 px-3 py-2 text-xl outline-none ring-0 focus:border-sky-600 ${
          state?.errors?.nome ? 'border-rose-500' : 'border-slate-700'
        }`}
        id="nome"
        name="nome"
        type="text"
        placeholder="Digite seu nome"
        aria-invalid={state?.errors?.nome ? 'true' : 'false'}
      />
      {state?.errors?.nome ? (
        <p className="mt-1 mb-5 text-lg font-medium text-rose-700">{state.errors.nome}</p>
      ) : null}

      <label className="mb-2 block text-3xl font-semibold text-slate-900" htmlFor="ra">
        RA do aluno:
      </label>
      <input
        className={`mb-5 w-full rounded border-2 px-3 py-2 text-xl outline-none ring-0 focus:border-sky-600 ${
          state?.errors?.ra ? 'border-rose-500' : 'border-slate-700'
        }`}
        id="ra"
        name="ra"
        type="text"
        placeholder="Digite seu RA"
        aria-invalid={state?.errors?.ra ? 'true' : 'false'}
      />
      {state?.errors?.ra ? (
        <p className="mt-1 mb-5 text-lg font-medium text-rose-700">{state.errors.ra}</p>
      ) : null}

      <label className="mb-2 block text-3xl font-semibold text-slate-900" htmlFor="senha">
        Senha do aluno(a):
      </label>
      <input
        className={`mb-8 w-full rounded border-2 px-3 py-2 text-xl outline-none ring-0 focus:border-sky-600 ${
          state?.errors?.senha ? 'border-rose-500' : 'border-slate-700'
        }`}
        id="senha"
        name="senha"
        type="password"
        placeholder="Digite sua senha"
        aria-invalid={state?.errors?.senha ? 'true' : 'false'}
      />
      {state?.errors?.senha ? (
        <p className="mt-1 mb-8 text-lg font-medium text-rose-700">{state.errors.senha}</p>
      ) : null}

      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded border-2 border-slate-900 bg-slate-100 px-10 py-3 text-4xl font-semibold text-slate-900 transition hover:bg-sky-500 hover:text-white"
        >
          Acessar
        </button>
      </div>

      {state?.message ? (
        <p className="mt-2 rounded-lg bg-rose-600/90 px-5 py-3 text-lg font-medium text-white opacity-100 transition-opacity">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

