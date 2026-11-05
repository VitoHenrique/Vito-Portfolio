import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Rótulo para leitor de tela, ex.: "Prévia do site no celular". */
  rotulo: string;
  className?: string;
};

/**
 * Moldura de celular desenhada pela vito.dev: Grafite Claro com borda Linha.
 * Sem marca de fabricante. A tela é 9:19,5 e recorta o conteúdo.
 */
export function Celular({ children, rotulo, className = "" }: Props) {
  return (
    <figure
      aria-label={rotulo}
      className={`relative mx-auto w-full max-w-[320px] rounded-[44px] border border-linha bg-grafite-claro p-2.5 ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[34px] bg-grafite">
        <span
          aria-hidden
          className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-pill bg-grafite-claro"
        />
        {children}
      </div>
    </figure>
  );
}
