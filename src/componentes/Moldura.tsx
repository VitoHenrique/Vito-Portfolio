import type { ReactNode } from "react";
import { Cabecalho } from "./Cabecalho";
import { Rodape } from "./Rodape";
import { Atalhos } from "./Atalhos";
import { AnimacaoCenas, Filme, Ponto } from "@/motion/Motor";

/**
 * A moldura de toda página do site: o Ponto, o contador de filme, as
 * entradas de cena, os atalhos, o cabeçalho e o rodapé. Cada página passa
 * só as suas cenas e as ilhas de animação próprias (ex.: o pin de sistemas).
 */
export function Moldura({ children, ilhas }: { children: ReactNode; ilhas?: ReactNode }) {
  return (
    <>
      <Ponto />
      <Filme />
      <AnimacaoCenas />
      {ilhas}
      <Atalhos />
      <Cabecalho />
      <main id="conteudo" className="relative z-10">
        {children}
      </main>
      <Rodape />
    </>
  );
}
