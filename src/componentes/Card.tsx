import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li" | "section";
  /** Borda Verde Lima: o card em destaque (ex.: Pacote Pro). */
  destaque?: boolean;
};

/** Grafite Claro, borda de 1 px em Linha, raio de 16 px. */
export function Card({ as: Tag = "div", destaque, className = "", ...resto }: Props) {
  return (
    <Tag
      className={`rounded-md border bg-grafite-claro p-4 md:p-5 ${destaque ? "border-verde-lima" : "border-linha"} ${className}`}
      {...resto}
    />
  );
}
