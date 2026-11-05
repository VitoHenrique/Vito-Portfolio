import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vito.dev | Engenharia de Performance",
  description: "Tecnologia de alta performance para negócios ambiciosos. Sites e Sistemas ultra-rápidos equipados com a nova stack da web.",
  openGraph: {
    title: "Vito.dev | Engenharia de Performance",
    description: "Tecnologia de alta performance para negócios ambiciosos. Sites e Sistemas ultra-rápidos equipados com a nova stack da web.",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Vito.dev Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
