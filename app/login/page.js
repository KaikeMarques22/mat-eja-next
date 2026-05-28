import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/fundo-eja.png')" }}
    >
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:py-12">
        <div className="w-full text-center lg:flex-1 lg:text-left">
          <h1
            className="inline-block rounded-xl border-2 border-slate-900 bg-white/90 px-5 py-2 text-4xl font-extrabold tracking-wide text-slate-900 shadow-lg sm:text-5xl lg:text-6xl"
            style={{ textShadow: "1px 1px 0 #ffffff" }}
          >
            E-Solve
          </h1>
          <p className="mt-3 text-lg text-slate-800 sm:text-xl lg:max-w-md">
            Seja bem-vindo(a) à sua plataforma de estudos e evolução
          </p>
        </div>

        <div className="w-full max-w-xl lg:flex-1 lg:max-w-md xl:max-w-lg">
          <LoginForm />
          <p className="mt-6 text-center text-base text-slate-800 sm:text-lg">
            Primeira vez aqui?{" "}
            <Link
              href="/cadastro"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Criar conta (RA e senha)
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
