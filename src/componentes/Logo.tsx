/**
 * Logo oficial. Sempre o arquivo da marca: nunca redigitar com a fonte,
 * girar, distorcer, aplicar efeito ou colocar sobre o Verde Lima.
 * As medidas são os viewBox dos SVGs oficiais (já incluem a área de proteção).
 */
const arquivos = {
  horizontal: { src: "/marca/vito-dev_horizontal_positivo.svg", w: 501.44, h: 185.55 },
  "horizontal-simbolo": { src: "/marca/vito-dev_horizontal-simbolo_positivo.svg", w: 606.02, h: 185.55 },
  reduzida: { src: "/marca/vito-dev_reduzida_positivo.svg", w: 508.05, h: 185.55 },
  vertical: { src: "/marca/vito-dev_vertical_positivo.svg", w: 501.44, h: 310.13 },
  simbolo: { src: "/marca/vito-dev_simbolo_positivo.svg", w: 110.65, h: 110.65 },
  "mono-claro": { src: "/marca/vito-dev_horizontal_mono-claro.svg", w: 501.44, h: 185.55 },
} as const;

export type VarianteLogo = keyof typeof arquivos;

type Props = {
  variante?: VarianteLogo;
  /** Largura em px. Horizontal com no mínimo 160 px; entre 80 e 160 px use "reduzida". */
  largura: number;
  className?: string;
  /** false quando o logo é decorativo e o nome já está em texto ao lado. */
  rotulado?: boolean;
  prioridade?: boolean;
};

export function Logo({ variante = "horizontal", largura, className, rotulado = true, prioridade }: Props) {
  const { src, w, h } = arquivos[variante];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG oficial, não passa por otimização de raster
    <img
      src={src}
      width={largura}
      height={Math.round((largura * h) / w)}
      alt={rotulado ? "vito.dev" : ""}
      aria-hidden={rotulado ? undefined : true}
      decoding="async"
      fetchPriority={prioridade ? "high" : undefined}
      draggable={false}
      className={className}
    />
  );
}
