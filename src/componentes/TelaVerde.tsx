import { TituloDuasVozes } from "./TituloDuasVozes";

type Props = {
  pesada: string;
  leve: string;
  texto: string;
};

/**
 * O momento verde antes dos planos: uma vez por página, no máximo uma altura
 * de tela. Texto em Grafite e, à direita, o símbolo Encontro todo em Grafite
 * (mono escuro), centralizado com o texto.
 *
 * Exceção à regra "logo nunca sobre o Verde Lima", decidida pelo Vito em
 * 05/11/2026. A geometria é a do SVG oficial, só a cor muda (versão mono).
 * O cabeçalho continua saindo de cena aqui (Atalhos.tsx).
 */
export function TelaVerde({ pesada, leve, texto }: Props) {
  return (
    <div data-tela-verde className="flex min-h-[80svh] items-center bg-verde-lima px-3 py-6 md:min-h-[90svh] md:px-6">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-6 md:grid-cols-[1fr_auto] md:gap-[64px]">
        <div className="flex flex-col gap-4">
          <TituloDuasVozes id="titulo-planos" pesada={pesada} leve={leve} sobreVerde className="max-w-[16ch]" />
          <p className="corpo max-w-[46ch] text-grafite">{texto}</p>
        </div>
        <svg
          viewBox="0 0 110.65 110.65"
          role="img"
          aria-label="Símbolo da vito.dev"
          className="h-auto w-28 justify-self-start md:w-[min(26vw,300px)] md:justify-self-end"
        >
          <g transform="translate(2.324 110.647)" className="fill-grafite">
            <path d="M51.12 -74.92L34.12 -39.43L0.00 -110.65L34.00 -110.65Z" />
            <path d="M71.88 -39.43L54.88 -74.92L72.00 -110.65L106.00 -110.65Z" />
            <path d="M70.00 -35.49L53.00 0.00L36.00 -35.49L53.00 -70.98Z" />
          </g>
        </svg>
      </div>
    </div>
  );
}
