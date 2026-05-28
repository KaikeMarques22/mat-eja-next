import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default function CadastroPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/fundo-eja.png')" }}
    >
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:py-12">
        <div className="w-full lg:flex-1">
          <Link
            href="/login"
            className="mb-4 inline-flex rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-slate-800 hover:bg-white lg:mb-6"
          >
            ← Voltar ao login
          </Link>
          <div className="text-center lg:text-left">
            <h1 className="inline-block rounded-xl border-2 border-slate-900 bg-white/90 px-5 py-2 text-3xl font-extrabold text-slate-900 shadow-lg sm:text-4xl lg:text-5xl">
              E-Solve
            </h1>
            <p className="mt-3 text-lg text-slate-800 sm:text-xl lg:max-w-md">
              Crie seu RA e senha para começar a estudar
            </p>
          </div>
        </div>

        <div className="w-full max-w-xl lg:flex-1 lg:max-w-md xl:max-w-lg">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
