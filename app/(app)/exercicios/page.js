'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const EXERCICIOS = [
  {
    id: 'equacao-2-grau',
    titulo: 'Equação do 2º grau',
    subtitulo: '10 questões (múltipla escolha)',
    hrefAprendizagem: '/aprendizagem/equacao-2-grau',
    fonteLabel: 'Mundo Educação',
    questoes: [
      {
        enunciado: '1. Qual das equações abaixo é uma equação do 2º grau?',
        opcoes: [
          'A) x² + 5x + 6 = 0',
          'B) 2x + 4 = 0',
          'C) x − 8 = 2',
          'D) 5 + y = 9',
        ],
        correta: 0,
      },
      {
        enunciado: '2. Na equação x² + 7x + 10 = 0, qual é o valor de b?',
        opcoes: ['A) 1', 'B) 7', 'C) 10', 'D) 0'],
        correta: 1,
      },
      {
        enunciado:
          '3. Qual é o valor do discriminante (Δ) da equação x² + 5x + 6 = 0?',
        opcoes: ['A) 1', 'B) 5', 'C) 25', 'D) 49'],
        correta: 0,
      },
      {
        enunciado:
          '4. Quantas raízes reais possui uma equação do 2º grau quando Δ > 0?',
        opcoes: ['A) Nenhuma', 'B) Uma', 'C) Duas', 'D) Infinitas'],
        correta: 2,
      },
      {
        enunciado: '5. Resolva a equação x² − 9 = 0.',
        opcoes: ['A) x = 3', 'B) x = −3', 'C) x = 3 e x = −3', 'D) x = 9'],
        correta: 2,
      },
      {
        enunciado: '6. Qual é a soma das raízes da equação x² − 6x + 8 = 0?',
        opcoes: ['A) 6', 'B) 8', 'C) 2', 'D) −6'],
        correta: 0,
      },
      {
        enunciado:
          '7. Qual é o produto das raízes da equação x² − 5x + 6 = 0?',
        opcoes: ['A) 5', 'B) 6', 'C) 11', 'D) 30'],
        correta: 1,
      },
      {
        enunciado: '8. A equação x² + 4x + 4 = 0 possui:',
        opcoes: [
          'A) Duas raízes diferentes',
          'B) Uma raiz real',
          'C) Nenhuma raiz',
          'D) Três raízes',
        ],
        correta: 1,
      },
      {
        enunciado:
          '9. Qual é a fórmula de Bhaskara utilizada para resolver equações do 2º grau?',
        opcoes: [
          'A) x = (−b ± √Δ) / 2a',
          'B) x = a + b + c',
          'C) x = b² − 4ac',
          'D) x = a² + b²',
        ],
        correta: 0,
      },
      {
        enunciado: '10. Resolva a equação x² − 4x − 5 = 0.',
        opcoes: [
          'A) x = 5 e x = −1',
          'B) x = 1 e x = −5',
          'C) x = 4 e x = 5',
          'D) x = −4 e x = 5',
        ],
        correta: 0,
      },
    ],
  },
  {
    id: 'pitagoras',
    titulo: 'Teorema de Pitágoras',
    subtitulo: '10 questões (múltipla escolha)',
    hrefAprendizagem: '/aprendizagem/pitagoras',
    fonteLabel: 'Brasil Escola',
    questoes: [
      {
        enunciado:
          '1. Um triângulo retângulo possui catetos medindo 6 cm e 8 cm. Qual é a medida da hipotenusa?',
        opcoes: ['A) 10 cm', 'B) 12 cm', 'C) 14 cm', 'D) 16 cm'],
        correta: 0,
      },
      {
        enunciado:
          '2. A hipotenusa de um triângulo retângulo mede 13 cm e um dos catetos mede 5 cm. Quanto mede o outro cateto?',
        opcoes: ['A) 8 cm', 'B) 10 cm', 'C) 12 cm', 'D) 15 cm'],
        correta: 2,
      },
      {
        enunciado:
          '3. Uma escada de 10 metros está apoiada em uma parede. A base da escada está a 6 metros da parede. Qual altura a escada alcança?',
        opcoes: ['A) 6 m', 'B) 7 m', 'C) 8 m', 'D) 9 m'],
        correta: 2,
      },
      {
        enunciado:
          '4. Um terreno retangular possui 9 metros de largura e 12 metros de comprimento. Qual é a diagonal do terreno?',
        opcoes: ['A) 13 m', 'B) 14 m', 'C) 15 m', 'D) 16 m'],
        correta: 2,
      },
      {
        enunciado:
          '5. As medidas 7, 24 e 25 formam um triângulo retângulo?',
        opcoes: ['A) Sim', 'B) Não', 'C) Apenas às vezes', 'D) Não é possível saber'],
        correta: 0,
      },
      {
        enunciado:
          '6. Uma televisão possui 24 polegadas de altura e 32 polegadas de largura. Qual é aproximadamente a diagonal da tela?',
        opcoes: ['A) 36 pol', 'B) 40 pol', 'C) 42 pol', 'D) 48 pol'],
        correta: 1,
      },
      {
        enunciado:
          '7. Um ponto está localizado 3 metros para o lado e 4 metros para cima em relação a outro ponto. Qual é a distância direta entre eles?',
        opcoes: ['A) 4 m', 'B) 5 m', 'C) 6 m', 'D) 7 m'],
        correta: 1,
      },
      {
        enunciado:
          '8. Um jogador correu 15 metros para frente e depois 20 metros para o lado. Qual foi a distância em linha reta entre o ponto inicial e final?',
        opcoes: ['A) 20 m', 'B) 22 m', 'C) 25 m', 'D) 30 m'],
        correta: 2,
      },
      {
        enunciado:
          '9. A hipotenusa mede 17 cm e um dos catetos mede 8 cm. Determine o valor do outro cateto.',
        opcoes: ['A) 12 cm', 'B) 13 cm', 'C) 14 cm', 'D) 15 cm'],
        correta: 3,
      },
      {
        enunciado:
          '10. Um cabo de aço de 25 metros foi preso ao topo de um poste. A distância da base do poste até o cabo no chão é de 7 metros. Qual é a altura do poste?',
        opcoes: ['A) 22 m', 'B) 23 m', 'C) 24 m', 'D) 25 m'],
        correta: 2,
      },
    ],
  },
];

function letraDaOpcao(opcao) {
  const match = String(opcao).match(/^\s*([A-D])\)/i);
  return match ? match[1].toUpperCase() : null;
}

export default function ExerciciosPage() {
  const [respostas, setRespostas] = useState(() => ({}));
  const [resultado, setResultado] = useState(() => ({}));
  const [mostrarGabarito, setMostrarGabarito] = useState(false);

  const totalPorMateria = useMemo(() => {
    const map = {};
    for (const m of EXERCICIOS) map[m.id] = m.questoes.length;
    return map;
  }, []);

  function marcar(materiaId, questaoIdx, opcaoIdx) {
    setRespostas((prev) => ({
      ...prev,
      [materiaId]: { ...(prev[materiaId] ?? {}), [questaoIdx]: opcaoIdx },
    }));
    setResultado((prev) => ({ ...prev, [materiaId]: undefined }));
  }

  function corrigir(materia) {
    const respMateria = respostas[materia.id] ?? {};
    let acertos = 0;
    materia.questoes.forEach((q, idx) => {
      if (respMateria[idx] === q.correta) acertos += 1;
    });
    setResultado((prev) => ({ ...prev, [materia.id]: { acertos } }));
  }

  function resetarMateria(materiaId) {
    setRespostas((prev) => ({ ...prev, [materiaId]: {} }));
    setResultado((prev) => ({ ...prev, [materiaId]: undefined }));
  }

  return (
    <main className="min-h-screen pb-6">
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-5 text-white">
        <h1 className="text-2xl font-bold">Exercícios</h1>
        <p className="mt-2 text-sm leading-relaxed text-blue-50">
          Pratique com exercícios de múltipla escolha. Você pode corrigir por
          matéria e acompanhar seus acertos.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMostrarGabarito((v) => !v)}
            className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            {mostrarGabarito ? 'Ocultar gabarito' : 'Mostrar gabarito'}
          </button>
          <Link
            href="/aprendizagem"
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Ir para Aprendizagem
          </Link>
        </div>
      </header>

      <article className="space-y-6 px-4 py-6 text-slate-800">
        {EXERCICIOS.map((materia) => {
          const respMateria = respostas[materia.id] ?? {};
          const r = resultado[materia.id];
          const respondidas = Object.keys(respMateria).length;
          const total = totalPorMateria[materia.id] ?? materia.questoes.length;

          return (
            <section
              key={materia.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {materia.titulo}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {materia.subtitulo} · {respondidas}/{total} respondidas
                    </p>
                    <Link
                      href={materia.hrefAprendizagem}
                      className="mt-2 inline-block text-sm font-medium text-blue-700 underline hover:text-blue-900"
                    >
                      Revisar conteúdo dessa matéria
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => corrigir(materia)}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Corrigir
                    </button>
                    <button
                      type="button"
                      onClick={() => resetarMateria(materia.id)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Limpar
                    </button>
                  </div>
                </div>

                {r && (
                  <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-950">
                    <strong>Resultado:</strong> {r.acertos}/{total} acertos
                  </div>
                )}
              </div>

              <div className="space-y-4 px-4 py-5">
                {materia.questoes.map((q, idx) => {
                  const marcada = respMateria[idx];
                  const certa = q.correta;
                  const mostrarCorrecao = Boolean(r) || mostrarGabarito;

                  return (
                    <div
                      key={`${materia.id}-${idx}`}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {q.enunciado}
                      </p>

                      <div className="mt-3 grid gap-2">
                        {q.opcoes.map((op, opIdx) => {
                          const isMarcada = marcada === opIdx;
                          const isCerta = opIdx === certa;
                          const isErradaMarcada =
                            mostrarCorrecao && isMarcada && !isCerta;

                          const base =
                            'flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition';
                          const cls = !mostrarCorrecao
                            ? isMarcada
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-slate-200 hover:bg-slate-50'
                            : isCerta
                              ? 'border-emerald-200 bg-emerald-50'
                              : isErradaMarcada
                                ? 'border-rose-200 bg-rose-50'
                                : isMarcada
                                  ? 'border-slate-300 bg-slate-50'
                                  : 'border-slate-200';

                          return (
                            <button
                              key={op}
                              type="button"
                              onClick={() => marcar(materia.id, idx, opIdx)}
                              className={`${base} ${cls}`}
                              aria-pressed={isMarcada}
                            >
                              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-700">
                                {letraDaOpcao(op) ?? opIdx + 1}
                              </span>
                              <span className="text-slate-800">{op}</span>
                            </button>
                          );
                        })}
                      </div>

                      {mostrarCorrecao && (
                        <p className="mt-3 text-xs text-slate-600">
                          Gabarito: <strong>{q.opcoes[certa]}</strong>
                        </p>
                      )}
                    </div>
                  );
                })}

                <p className="text-xs text-slate-500">
                  Exercícios baseados em material de referência ({materia.fonteLabel}).
                </p>
              </div>
            </section>
          );
        })}
      </article>
    </main>
  );
}
