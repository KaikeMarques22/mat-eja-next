import { redirect } from "next/navigation";

export default function HomePage() {
  // Redireciona automaticamente para a tela de login.
  redirect("/login");
}

