import { Easing, interpolate } from "remotion";
import { curvas } from "@/motion/curvas";

/**
 * Tema das composições. O Player desenha dentro da página, então as cores e
 * as fontes vêm das mesmas variáveis CSS do site: nenhuma cor fora dos tokens.
 * Padrões do repositório REMOTION-VIDEOS: animação só por useCurrentFrame(),
 * a parte pesada antes da leve, o ponto carimba por último, sem fade puro.
 */
export const FPS = 30;

export const cor = {
  lima: "var(--color-verde-lima)",
  grafite: "var(--color-grafite)",
  grafiteClaro: "var(--color-grafite-claro)",
  linha: "var(--color-linha)",
  giz: "var(--color-giz)",
  oliva: "var(--color-cinza-oliva)",
  coral: "var(--color-coral)",
} as const;

export const fonte = {
  sans: "var(--font-sans)",
  mono: "var(--font-mono)",
} as const;

export const curva = {
  entrada: Easing.bezier(...curvas.entrada),
  saida: Easing.bezier(...curvas.saida),
};

/** Frames dos tokens de movimento do site, a 30 fps. */
export const f = {
  entrada: 18, // 0,6 s
  saida: 9, // 0,3 s
  carimbo: 11, // 0,35 s
  leve: 4, // +0,12 s
  ponto: 8, // +0,28 s
  cascata: 3, // 0,1 s
} as const;

const preso = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Progresso 0 → 1 entre dois frames, com a curva de entrada. */
export const entrar = (frame: number, inicio: number, dur: number = f.entrada) =>
  interpolate(frame, [inicio, inicio + dur], [0, 1], { ...preso, easing: curva.entrada });

/** Progresso 0 → 1 de saída. */
export const sair = (frame: number, inicio: number, dur: number = f.saida) =>
  interpolate(frame, [inicio, inicio + dur], [0, 1], { ...preso, easing: curva.saida });

/** Carimbo do ponto: 0 → 1,18 → 1. */
export const carimbo = (frame: number, inicio: number) =>
  interpolate(frame, [inicio, inicio + f.carimbo * 0.6, inicio + f.carimbo], [0, 1.18, 1], preso);

export { preso };
