import Link from 'next/link';

const FONTE_BRASIL_ESCOLA =
  'https://educador.brasilescola.uol.com.br/estrategias-ensino/ensinando-teorema-pitagoras.htm';
const VIDEO_YOUTUBE = 'https://www.youtube.com/watch?v=7YeYeL2MjB4';
const VIDEO_EMBED = 'https://www.youtube.com/embed/7YeYeL2MjB4';

export default function PitagorasPage() {
  return (
    <main className="min-h-screen pb-4">
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-5 text-white">
        <Link
          href="/aprendizagem"
          className="mb-3 inline-flex items-center gap-1 text-sm text-blue-100 hover:text-white"
        >
          ← Voltar para Aprendizagem
        </Link>
        <h1 className="text-2xl font-bold">Teorema de Pitágoras</h1>
        <p className="mt-2 text-sm leading-relaxed text-blue-50">
          Um dos alicerces da Matemática — essencial para Geometria e
          Trigonometria.
        </p>
      </header>

      <article className="space-y-5 px-4 py-6 text-slate-800">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Por que estudar?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            O Teorema de Pitágoras ajuda a resolver problemas com medidas e
            distâncias. Com ele, construímos e generalizamos diversas situações
            matemáticas e ele também é muito usado na Física.
          </p>
        </section>

        <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
          <h2 className="text-lg font-bold text-blue-900">Definição</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-blue-950">
            A soma dos quadrados dos catetos é igual ao quadrado da hipotenusa.
          </p>
          <p className="mt-3 rounded-xl bg-white px-4 py-3 text-center text-xl font-bold text-blue-700">
            a² = b² + c²
          </p>
          <p className="mt-2 text-xs text-blue-800">
            Em que <strong>a</strong> é a hipotenusa e <strong>b</strong> e{' '}
            <strong>c</strong> são os catetos.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            1º passo — Triângulo retângulo
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            O teorema só vale para o <strong>triângulo retângulo</strong>, ou
            seja, aquele que tem um ângulo de 90°.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Catetos:</strong> os dois lados que formam o ângulo reto.
            </li>
            <li>
              <strong>Hipotenusa:</strong> o maior lado, oposto ao ângulo reto.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            2º passo — Exemplo numérico
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Pense em um triângulo retângulo com catetos de 4 e 3 unidades e
            hipotenusa de 5 unidades:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>• Quadrado do cateto b (4): 4² = 16</li>
            <li>• Quadrado do cateto c (3): 3² = 9</li>
            <li>• Quadrado da hipotenusa a (5): 5² = 25</li>
          </ul>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-800">
            <p>a² = b² + c²</p>
            <p className="mt-1">5² = 4² + 3²</p>
            <p className="mt-1">25 = 16 + 9</p>
            <p className="mt-1 font-bold text-blue-700">25 = 25 ✓</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Essa relação vale em qualquer triângulo retângulo e em problemas
            que podem ser representados por um deles.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Vídeo no YouTube</h2>
          <p className="mt-2 text-sm text-slate-700">
            Quer reforçar com uma videoaula? Assista abaixo ou abra no YouTube:
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <iframe
              title="Videoaula — Teorema de Pitágoras"
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
            Conteúdo adaptado com base no material da Brasil Escola:
          </p>
          <a
            href={FONTE_BRASIL_ESCOLA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-blue-600 underline hover:text-blue-800"
          >
            Ensinando o Teorema de Pitágoras — Brasil Escola
          </a>
        </section>
      </article>
    </main>
  );
}
