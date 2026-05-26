import Link from 'next/link';

const FONTE_MUNDO_EDUCACAO =
  'https://mundoeducacao.uol.com.br/matematica/equacao-2-grau.htm';
const VIDEO_YOUTUBE = 'https://www.youtube.com/watch?v=r-Vuvb18kUk';
const VIDEO_EMBED = 'https://www.youtube.com/embed/r-Vuvb18kUk';

export default function Equacao2GrauPage() {
  return (
    <main className="min-h-screen pb-4">
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-5 text-white">
        <Link
          href="/aprendizagem"
          className="mb-3 inline-flex items-center gap-1 text-sm text-blue-100 hover:text-white"
        >
          ← Voltar para Aprendizagem
        </Link>
        <h1 className="text-2xl font-bold">Equação do 2º grau</h1>
        <p className="mt-2 text-sm leading-relaxed text-blue-50">
          Aprenda a identificar, classificar e resolver equações do segundo
          grau.
        </p>
      </header>

      <article className="space-y-5 px-4 py-6 text-slate-800">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">O que é?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            A equação do 2º grau é do tipo <strong>ax² + bx + c = 0</strong>,
            em que <strong>a</strong>, <strong>b</strong> e <strong>c</strong>{' '}
            são números reais (coeficientes) e <strong>a ≠ 0</strong>.
          </p>
          <p className="mt-2 text-sm text-slate-600">Exemplos:</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>• 2x² + 3x − 4 = 0</li>
            <li>• x² + 2x = 0</li>
            <li>• −x² + 14 = 0</li>
          </ul>
        </section>

        <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
          <h2 className="text-lg font-bold text-blue-900">Resumo</h2>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-blue-950">
            <li>
              <strong>Completa:</strong> todos os coeficientes diferentes de
              zero.
            </li>
            <li>
              <strong>Incompleta:</strong> quando b = 0 ou c = 0.
            </li>
            <li>
              Ela tem, no máximo, <strong>duas soluções reais</strong>.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            O discriminante (Δ)
          </h2>
          <p className="mt-2 rounded-xl bg-slate-50 px-4 py-3 text-center font-mono text-lg font-bold text-blue-700">
            Δ = b² − 4ac
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Δ &gt; 0:</strong> duas soluções reais.
            </li>
            <li>
              <strong>Δ = 0:</strong> uma solução real.
            </li>
            <li>
              <strong>Δ &lt; 0:</strong> nenhuma solução real.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Fórmula de Bhaskara</h2>
          <p className="mt-2 text-sm text-slate-700">
            Principal método para encontrar as raízes (valores de x):
          </p>
          <p className="mt-3 rounded-xl bg-blue-50 px-3 py-4 text-center font-mono text-base font-bold text-blue-800">
            x = (−b ± √Δ) / 2a
          </p>
          <h3 className="mt-4 text-sm font-bold text-slate-900">Exemplo</h3>
          <p className="mt-1 text-sm text-slate-700">
            Resolva: <strong>x² + 3x − 4 = 0</strong>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Coeficientes: a = 1, b = 3, c = −4
          </p>
          <div className="mt-3 rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-800">
            <p>Δ = 3² − 4 · 1 · (−4)</p>
            <p className="mt-1">Δ = 9 + 16 = 25</p>
            <p className="mt-2">x = (−3 ± 5) / 2</p>
            <p className="mt-1 font-bold text-blue-700">x₁ = 1 e x₂ = −4</p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Soma e produto</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Método útil quando as raízes são números inteiros. Se x₁ e x₂ são
            as soluções:
          </p>
          <p className="mt-3 font-mono text-sm text-blue-800">
            x₁ + x₂ = −b/a
          </p>
          <p className="mt-1 font-mono text-sm text-blue-800">
            x₁ · x₂ = c/a
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Exemplo: <strong>x² − 2x − 8 = 0</strong> → soma = 2 e produto =
            −8. As raízes são <strong>−2</strong> e <strong>4</strong>.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Vídeo no YouTube</h2>
          <p className="mt-2 text-sm text-slate-700">
            Quer reforçar com uma videoaula? Assista abaixo ou abra no YouTube:
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <iframe
              title="Videoaula — Equação do 2º grau"
              src={VIDEO_EMBED}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a
            href={VIDEO_YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Abrir no YouTube
          </a>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-bold text-slate-800">Fonte de referência</h2>
          <p className="mt-1 text-xs text-slate-600">
            Conteúdo adaptado com base no material do Mundo Educação:
          </p>
          <a
            href={FONTE_MUNDO_EDUCACAO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-blue-600 underline hover:text-blue-800"
          >
            Equação do 2º grau — Mundo Educação
          </a>
        </section>
      </article>
    </main>
  );
}
