import "./globals.css";

export const metadata = {
  title: "Mat EJA",
  description: "Plataforma de estudos para a EJA",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="min-h-screen font-sans bg-slate-50">{children}</body>
    </html>
  );
}

