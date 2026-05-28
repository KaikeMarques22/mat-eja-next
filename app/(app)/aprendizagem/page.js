import Link from 'next/link';
import { requireUser } from '../../../lib/auth';
import { getProgressoPorTema } from '../../../lib/users';

export default async function AprendizagemPage() {
  const user = await requireUser();
  const temas = await getProgressoPorTema(user.id);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:px-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Aprendizagem</h1>
        <p className="mt-1 text-slate-600">
          Estude os conteúdos no seu ritmo e acompanhe seu progresso.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {temas.map((tema) =>
          tema.disponivel ? (
            <Link
              key={tema.slug}
              href={`/aprendizagem/${tema.slug}`}
              className="block rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <TemaCard tema={tema} />
            </Link>
          ) : (
            <article
              key={tema.slug}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 opacity-80"
            >
              <TemaCard tema={tema} badge="Em breve" />
            </article>
          )
        )}
      </div>
    </main>
  );
}

function TemaCard({ tema, badge }) {
  return (
    <>
      <div className="mb-2 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">{tema.titulo}</h2>
        {badge ? (
          <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
            {badge}
          </span>
        ) : (
          <span className="shrink-0 text-sm font-medium text-blue-600">
            {tema.progresso}%
          </span>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${tema.progresso}%` }}
        />
      </div>
    </>
  );
}
