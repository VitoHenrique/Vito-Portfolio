import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Rótulo para leitor de tela, ex.: "Prévia do site no celular". */
  rotulo: string;
  className?: string;
};

/**
 * Moldura de celular desenhada pela vito.dev: só as bordas, em Grafite Claro
 * com contorno Linha. Sem ilha nem marca de fabricante (atrapalhava a tela).
 * A tela é 9:19,5 e recorta o conteúdo.
 */
export function Celular({ children, rotulo, className = "" }: Props) {
  return (
    <figure
      aria-label={rotulo}
      className={`relative mx-auto w-full max-w-[320px] rounded-[44px] border border-linha bg-grafite-claro p-2.5 ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[34px] bg-grafite">{children}</div>
    </figure>
  );
}
