import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/fundo-eja.png')" }}
    >
      <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-8">
        <h1
          className="rounded-xl border-2 border-slate-900 bg-white/90 px-6 py-2 text-5xl font-extrabold tracking-wide text-slate-900 shadow-lg"
          style={{ textShadow: "1px 1px 0 #ffffff" }}
        >
          Mat EJA
        </h1>
        <p className="mt-3 text-center text-xl text-slate-800">
          Seja bem-vindo(a) à sua plataforma de estudos e evolução
        </p>

        <LoginForm />
        <p className="mt-6 text-center text-lg text-slate-800">
          Primeira vez aqui?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-blue-700 underline hover:text-blue-900"
          >
            Criar conta (RA e senha)
          </Link>
        </p>
      </section>
    </main>
  );
}

