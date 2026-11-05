import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { contatos, marca } from "@/conteudo/site";
import { Rolagem } from "@/motion/Rolagem";

const epilogue = localFont({
  src: "../fontes/Epilogue-Variable.woff2",
  variable: "--fonte-epilogue",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const martian = localFont({
  src: "../fontes/MartianMono-Variable.woff2",
  variable: "--fonte-martian",
  weight: "100 800",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(contatos.site),
  title: { default: marca.titulo, template: "%s | vito.dev" },
  description: marca.descricao,
  applicationName: marca.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: marca.nome,
    title: marca.titulo,
    description: marca.descricao,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: marca.titulo, description: marca.descricao },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0f0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${epilogue.variable} ${martian.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only rounded-pill bg-giz px-5 py-3 font-semibold text-grafite focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        <Rolagem />
        {children}
      </body>
    </html>
  );
}
