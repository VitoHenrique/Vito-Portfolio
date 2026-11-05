"use client";

import { gsap, ScrollTrigger } from "@/motion/gsap";
import { useCena } from "@/motion/usarCena";
import { duasVozes } from "@/motion/assinatura";
import { tempos } from "@/motion/curvas";

/**
 * Cena 8 · o obturador. O Ponto pousa no centro do palco e a sala se abre de
 * dentro dele, como uma íris: um círculo escuro cresce a partir do centro do
 * Ponto até mostrar o reel. Desktop: cena presa (pin) de 120 vh, o scroll
 * controla a abertura. Celular: sem pin, abre sozinha ao entrar.
 * Movimento reduzido: nada anima, a sala já está aberta.
 */
export function AnimacaoVideos() {
  useCena(
    () => document.getElementById("videos"),
    (ctx, secao) => {
      if (ctx === "reduzido") return;
      const palco = secao.querySelector<HTMLElement>("[data-palco-videos]");
      const sala = secao.querySelector<HTMLElement>("[data-sala]");
      const titulo = secao.querySelector("#titulo-videos");
      if (!palco || !sala) return;

      if (titulo) {
        const tl = duasVozes(titulo).pause();
        ScrollTrigger.create({ trigger: titulo, start: "top 85%", once: true, onEnter: () => void tl.play() });
      }

      // A íris é uma variável numérica (0 → 1) lida pelo clip-path no CSS:
      // o GSAP interpola o número sem depender de parsear a string do círculo.
      sala.style.setProperty("--iris", "0");
      sala.style.clipPath = "circle(calc(var(--iris) * 75%) at 50% 50%)";
      const limpar = () => {
        sala.style.removeProperty("--iris");
        sala.style.clipPath = "";
      };

      if (ctx === "desktop") {
        gsap
          .timeline({
            scrollTrigger: { trigger: palco, start: "center center", end: "+=120%", scrub: 0.6, pin: true, anticipatePin: 1 },
          })
          .to(sala, { "--iris": 1, ease: "entrada", duration: 1 });
        return limpar;
      }

      ScrollTrigger.create({
        trigger: palco,
        start: "top 65%",
        once: true,
        onEnter: () => void gsap.to(sala, { "--iris": 1, duration: tempos.entradaLonga * 1.4, ease: "entrada" }),
      });
      return limpar;
    },
  );

  return null;
}
