import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Verde Lima só para rótulo que abre seção; o padrão é Cinza Oliva. */
  tom?: "oliva" | "lima" | "coral";
  as?: "p" | "span" | "div";
  className?: string;
};

const tons = { oliva: "text-cinza-oliva", lima: "text-verde-lima", coral: "text-coral" };

/** Martian Mono em caixa-alta, +4%. Só rótulo, preço, prazo e tempo: nunca título. */
export function Rotulo({ children, tom = "oliva", as: Tag = "p", className = "" }: Props) {
  return <Tag className={`rotulo ${tons[tom]} ${className}`}>{children}</Tag>;
}

/** Valor técnico em Martian Mono com números tabulares: "R$ 99,90", "0,8 s". */
export function Numero({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`numero ${className}`}>{children}</span>;
}
