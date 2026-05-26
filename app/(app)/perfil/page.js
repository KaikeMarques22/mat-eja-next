import Link from 'next/link';
import { requireUser } from '../../../lib/auth';
import {
  getConquistasUsuario,
  getProgressoGeral,
  getProgressoPorTema,
} from '../../../lib/users';
import { logoutAction } from './actions';

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function primeiroNome(nome) {
  return nome.split(' ')[0] || nome;
}

function membroDesdeTexto(criadoEm) {
  const data = criadoEm ? new Date(criadoEm) : new Date();
  return `${MESES[data.getMonth()]} ${data.getFullYear()}`;
}

export default async function PerfilPage() {
  const user = await requireUser();
  const [progressoGeral, temas, conquistas] = await Promise.all([
    getProgressoGeral(user.id),
    getProgressoPorTema(user.id),
    getConquistasUsuario(user.id),
  ]);

  const nomeExibicao = primeiroNome(user.nome);
  const membroDesde = membroDesdeTexto(user.criadoEm);

  return (
    <>
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 px-5 pb-8 pt-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10">
            <svg
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{nomeExibicao}</h1>
            <p className="text-sm text-blue-100">Membro desde {membroDesde}</p>
            <p className="mt-1 text-xs text-blue-200">RA: {user.ra}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Progresso geral</span>
            <span className="font-semibold">{progressoGeral}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-blue-900/40">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${progressoGeral}%` }}
            />
          </div>
          <p className="mt-4 text-center text-sm font-medium leading-snug text-blue-50">
            EJA ON — Estudos e aprendizado dentro e fora do seu conforto
          </p>
        </div>
      </header>

      <div className="space-y-6 px-4 py-6">
        <section>
          <h2 className="mb-3 text-lg font-bold text-slate-800">Seus estudos</h2>
          <div className="space-y-3">
            {temas.map((tema) => {
              const href =
                tema.disponivel && tema.slug
                  ? `/aprendizagem/${tema.slug}`
                  : null;

              const card = (
                <>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{tema.titulo}</p>
                    <span className="text-sm font-medium text-blue-600">
                      {tema.progresso}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${tema.progresso}%` }}
                    />
                  </div>
                  {href ? (
                    <p className="mt-2 text-xs font-medium text-blue-600">
                      Toque para continuar estudando →
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-500">Em breve</p>
                  )}
                </>
              );

              if (href) {
                return (
                  <Link
                    key={tema.slug}
                    href={href}
                    className="block rounded-2xl bg-white p-4 shadow-sm transition hover:ring-2 hover:ring-blue-200"
                  >
                    {card}
                  </Link>
                );
              }

              return (
                <article
                  key={tema.slug}
                  className="rounded-2xl bg-white p-4 shadow-sm opacity-80"
                >
                  {card}
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800">
            <span className="text-amber-500" aria-hidden>
              🏅
            </span>
            Conquistas
          </h2>
          {conquistas.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {conquistas.map((c) => (
                <article
                  key={`${c.titulo}-${c.descricao}`}
                  className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4"
                >
                  <p className="font-semibold text-slate-900">{c.titulo}</p>
                  <p className="mt-1 text-sm text-slate-600">{c.descricao}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
              Continue estudando para desbloquear conquistas.
            </p>
          )}
        </section>

        <section>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-center font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50"
            >
              Sair da conta
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
