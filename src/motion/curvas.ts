/**
 * Sistema de movimento: os únicos valores de curva e tempo do site.
 * Nenhuma cena define curva própria. Os mesmos números estão em
 * globals.css (--ease-entrada, --ease-saida) para o pouco de CSS que anima.
 */
export const curvas = {
  /** cubic-bezier(0.16, 1, 0.3, 1): texto, card e máscara entrando. */
  entrada: [0.16, 1, 0.3, 1],
  /** cubic-bezier(0.7, 0, 0.84, 0): sempre mais rápida que a entrada. */
  saida: [0.7, 0, 0.84, 0],
} as const satisfies Record<string, readonly [number, number, number, number]>;

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

/**
 * cubic-bezier(x1, y1, x2, y2) como função de progresso, igual à do CSS.
 * Substitui o CustomEase do GSAP (3 KB a menos na abertura).
 */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const y = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const resolver = (alvo: number) => {
    let t = alvo;
    for (let i = 0; i < 8; i++) {
      const erro = x(t) - alvo;
      if (Math.abs(erro) < 1e-6) return t;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= erro / d;
    }
    let lo = 0, hi = 1;
    t = alvo;
    while (lo < hi) {
      const v = x(t);
      if (Math.abs(v - alvo) < 1e-6) return t;
      if (alvo > v) lo = t;
      else hi = t;
      if (hi - lo < 1e-7) break;
      t = (lo + hi) / 2;
    }
    return t;
  };

  return (p: number) => (p <= 0 ? 0 : p >= 1 ? 1 : y(resolver(p)));
}
