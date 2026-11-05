type Props = {
  /** Nome da âncora, para o modo bastidores e a depuração. */
  nome: string;
  /** Carimba (1 → 1,18 → 1) quando o Ponto chega. */
  carimbo?: boolean;
  /** Tamanho e posição: o Ponto assume exatamente este círculo. Cortado pela borda é aqui. */
  className: string;
};

/**
 * Onde o Ponto pousa nesta cena. Componente de servidor, sem JavaScript:
 * a âncora já é um círculo Verde Lima no HTML. Sem JS, ou com movimento
 * reduzido, ela é o grafismo estático da cena. Com movimento, o Ponto
 * viajante (Ponto.tsx) assume o lugar dela. Sem texto em cima, nunca.
 */
export function AncoraPonto({ nome, carimbo, className }: Props) {
  return (
    <div
      aria-hidden
      data-ponto={nome}
      data-ponto-carimbo={carimbo ? "" : undefined}
      className={`ancora-ponto pointer-events-none aspect-square rounded-pill bg-verde-lima ${className}`}
    />
  );
}
