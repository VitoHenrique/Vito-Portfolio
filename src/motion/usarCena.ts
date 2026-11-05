"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "./gsap";

export type Contexto = "desktop" | "celular" | "reduzido";

/** Os três ramos de toda cena. "reduzido" vence os outros dois. */
export const consultas = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  celular: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  reduzido: "(prefers-reduced-motion: reduce)",
} as const;

type Montar = (ctx: Contexto, escopo: HTMLElement) => void | (() => void);

/**
 * Animação de uma cena, com limpeza automática ao sair (useGSAP + scope)
 * e um ramo por contexto (gsap.matchMedia).
 *
 *   const ref = useRef<HTMLElement>(null);
 *   useCena(ref, (ctx, el) => { if (ctx === "reduzido") return; ... });
 *
 * (O nome começa com "use" por exigência das regras de hooks do React.)
 */
export function useCena(escopo: RefObject<HTMLElement | null>, montar: Montar, deps: unknown[] = []) {
  useGSAP(
    () => {
      const el = escopo.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      (Object.keys(consultas) as Contexto[]).forEach((ctx) => {
        mm.add(consultas[ctx], () => montar(ctx, el));
      });
      return () => mm.revert();
    },
    { scope: escopo, dependencies: deps },
  );
}
