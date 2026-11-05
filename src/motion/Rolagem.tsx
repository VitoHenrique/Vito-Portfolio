"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Lenis só no desktop com ponteiro fino e sem movimento reduzido.
 * Scroll nativo em todo o resto. Sem ScrollSmoother: ele envolve a página
 * e complica elementos fixos (o Ponto, o cabeçalho, o botão de WhatsApp).
 */
export function Rolagem() {
  useEffect(() => {
    const ok = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!ok) return;

    let parar = () => {};
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      parar = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => parar();
  }, []);

  return null;
}
