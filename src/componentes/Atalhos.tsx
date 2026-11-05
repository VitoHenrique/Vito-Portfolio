"use client";

import { useEffect } from "react";

/**
 * Comportamentos pequenos da home, sem GSAP:
 * 1. O logo nunca vai sobre o Verde Lima: o cabeçalho sai de cena enquanto
 *    a tela verde dos planos está visível (classe no <html>, CSS faz o resto).
 * 2. Tecla ponto: apertar "." leva direto ao fecho (fora de campos de texto).
 */
export function Atalhos() {
  useEffect(() => {
    const html = document.documentElement;
    const verde = document.querySelector("[data-tela-verde]");
    let obs: IntersectionObserver | undefined;
    if (verde) {
      // Some quando a tela verde passa por baixo do cabeçalho (faixa dos 96 px do topo).
      obs = new IntersectionObserver(([e]) => html.toggleAttribute("data-tela-verde", Boolean(e?.isIntersecting)), {
        rootMargin: "0px 0px -88% 0px",
      });
      obs.observe(verde);
    }

    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "." || e.ctrlKey || e.metaKey || e.altKey) return;
      const alvo = e.target as HTMLElement | null;
      if (alvo && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName))) return;
      const fecho = document.getElementById("fecho");
      if (!fecho) return;
      e.preventDefault();
      fecho.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      document.getElementById("titulo-fecho")?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", tecla);
    return () => {
      obs?.disconnect();
      window.removeEventListener("keydown", tecla);
      html.removeAttribute("data-tela-verde");
    };
  }, []);
  return null;
}
