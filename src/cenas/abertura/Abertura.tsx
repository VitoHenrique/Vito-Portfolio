"use client";

import { gsap, useGSAP } from "@/motion/gsap";
import { carimbo } from "@/motion/assinatura";
import { abertura, tempos } from "@/motion/curvas";

// O script que liga a classe `abertura` antes da pintura está em ./script.ts.

/**
 * Cena 0 · Carimbo. Entrada de marca em até 0,8 s, só na primeira visita
 * da sessão e só com movimento liberado (o script em scriptAbertura decide).
 * vito entra, dev responde e o ponto carimba. Qualquer scroll, toque,
 * clique ou tecla pula na hora. O H1 não espera nada disso.
 */
export function Abertura() {
  useGSAP(() => {
    const html = document.documentElement;
    html.dataset.motor = "1";
    if (!html.classList.contains("abertura")) return;

    const parte = (p: string) => document.querySelector(`[data-logo-parte="${p}"]`);
    const vito = parte("vito");
    const dev = parte("dev");
    const ponto = parte("ponto");
    if (!vito || !dev || !ponto) return html.classList.remove("abertura");

    const fim = () => {
      html.classList.remove("abertura");
      try {
        sessionStorage.setItem("vd-abertura", "1");
      } catch {}
    };

    const tl = gsap.timeline({ onComplete: fim });
    tl.set([vito, dev, ponto], { autoAlpha: 1 })
      .fromTo(
        vito,
        { yPercent: 40, clipPath: "inset(100% 0% 0% 0%)" },
        { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: tempos.entradaCurta },
        tempos.duasVozes.pesada,
      )
      .fromTo(
        dev,
        { yPercent: 40, clipPath: "inset(100% 0% 0% 0%)" },
        { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: tempos.entradaCurta },
        tempos.duasVozes.leve,
      )
      .add(carimbo(ponto), tempos.duasVozes.ponto)
      // O Ponto viajante (Ponto.tsx) sai do logo neste meio-tempo; a cena acaba quando ele chega.
      .to({}, { duration: 0.01 }, abertura.saidaDoLogo + abertura.viagem);

    const pular = () => {
      tl.progress(1);
      window.dispatchEvent(new Event("vd:pular-abertura"));
      remover();
    };
    const eventos = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const remover = () => eventos.forEach((e) => window.removeEventListener(e, pular));
    eventos.forEach((e) => window.addEventListener(e, pular, { passive: true, once: true }));

    return () => {
      remover();
      tl.kill();
      fim();
    };
  });

  return null;
}
