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
type Escopo = RefObject<HTMLElement | null> | (() => HTMLElement | null);

/**
 * Animação de uma cena, com limpeza automática ao sair (gsap.matchMedia +
 * revert) e um ramo por contexto. O escopo pode ser uma ref ou uma função
 * que acha a seção no HTML do servidor (ilhas que não renderizam nada).
 *
 *   useCena(() => document.getElementById("videos"), (ctx, el) => { ... });
 *
 * (O nome começa com "use" por exigência das regras de hooks do React.)
 */
export function useCena(escopo: Escopo, montar: Montar, deps: unknown[] = []) {
  useGSAP(
    () => {
      const el = typeof escopo === "function" ? escopo() : escopo.current;
      if (!el) return;
      const mm = gsap.matchMedia(el);
      (Object.keys(consultas) as Contexto[]).forEach((ctx) => {
        mm.add(consultas[ctx], () => montar(ctx, el));
      });
      return () => mm.revert();
    },
    { dependencies: deps },
  );
}
