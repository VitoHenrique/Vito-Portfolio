import { wordmark } from "@/marca/wordmark";

type Props = {
  largura: number;
  className?: string;
};

/**
 * O wordmark oficial em três camadas (vito, ponto, dev), com os caminhos
 * do SVG da marca, sem redigitar. Existe para a cena 0 (carimbo): cada
 * parte entra no seu tempo. Fora da abertura, é idêntico ao <Logo>.
 */
export function Wordmark({ largura, className = "" }: Props) {
  const [, , w, h] = wordmark.viewBox.split(" ").map(Number);
  return (
    <svg
      role="img"
      aria-label="vito.dev"
      viewBox={wordmark.viewBox}
      width={largura}
      height={Math.round((largura * h!) / w!)}
      className={`overflow-visible ${className}`}
    >
      <g transform={wordmark.transform}>
        <path data-logo-parte="vito" d={wordmark.vito} className="fill-giz" />
        <path data-logo-parte="dev" d={wordmark.dev} className="fill-giz" />
        <path data-logo-parte="ponto" data-ponto-origem d={wordmark.ponto} className="fill-verde-lima" />
      </g>
    </svg>
  );
}
