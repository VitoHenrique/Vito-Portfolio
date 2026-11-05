/**
 * Sistema de movimento: os únicos valores de curva e tempo do site.
 * Nenhuma cena define curva própria. Os mesmos números estão em
 * globals.css (--ease-entrada, --ease-saida) para o pouco de CSS que anima.
 */
export const curvas = {
  /** Texto, card e máscara entrando. */
  entrada: "M0,0 C0.16,1 0.3,1 1,1",
  /** Sempre mais rápida que a entrada. */
  saida: "M0,0 C0.7,0 0.84,0 1,1",
} as const;

export const tempos = {
  entrada: 0.6,
  entradaCurta: 0.5,
  entradaLonga: 0.7,
  saida: 0.3,
  /** Carimbo do ponto: 0 → 1,18 → 1. */
  carimbo: 0.35,
  /** O ponto do logo é 18% maior que o da fonte: é daí que vem o excesso. */
  carimboExcesso: 1.18,
  cascata: 0.08,
  /** Assinatura duasVozes: pesada em 0, leve em +0,12 s, ponto em +0,28 s. */
  duasVozes: { pesada: 0, leve: 0.12, ponto: 0.28 },
  /** Corte seco de rótulo e de cena. */
  corte: 0.15,
} as const;
