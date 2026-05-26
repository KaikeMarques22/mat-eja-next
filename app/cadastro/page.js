import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default function CadastroPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/fundo-eja.png')" }}
    >
      <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-8">
        <Link
          href="/login"
          className="mb-4 self-start rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-slate-800 hover:bg-white"
        >
          ← Voltar ao login
        </Link>
        <h1 className="rounded-xl border-2 border-slate-900 bg-white/90 px-6 py-2 text-4xl font-extrabold text-slate-900 shadow-lg">
          Mat EJA
        </h1>
        <p className="mt-3 text-center text-lg text-slate-800">
          Crie seu RA e senha para começar a estudar
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
