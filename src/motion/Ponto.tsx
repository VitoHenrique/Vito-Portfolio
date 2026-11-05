"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "./gsap";
import { consultas } from "./usarCena";
import { tempos } from "./curvas";

/**
 * O Ponto: o único ponto gigante do site, e ele viaja.
 *
 * Cada cena declara uma âncora (componente <AncoraPonto>). A âncora já é um
 * círculo Verde Lima de verdade no HTML: sem JS, ou com movimento reduzido,
 * cada cena mostra o seu grafismo estático. Com movimento, a classe
 * `ponto-vivo` no <html> esconde as âncoras e este elemento fixo assume:
 * viaja de uma âncora a outra e depois fica preso a ela durante o scroll.
 */
const BASE = 1000; // px. Desenha grande e reduz com scale: borda sempre nítida.

export function Ponto() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ponto = ref.current;
    if (!ponto) return;
    const mm = gsap.matchMedia();

    mm.add(`${consultas.desktop}, ${consultas.celular}`, () => {
      const ancoras = gsap.utils.toArray<HTMLElement>("[data-ponto]");
      if (!ancoras.length) return;
      document.documentElement.classList.add("ponto-vivo");

      const estado = {
        atual: ancoras[0]!,
        de: { x: 0, y: 0, s: 0 },
        viagem: 1, // 0 → 1 durante a troca de âncora
        pulso: 1, // carimbo ao chegar
      };

      const alvo = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - BASE / 2, y: r.top + r.height / 2 - BASE / 2, s: r.width / BASE };
      };
      const misturar = (a: number, b: number, t: number) => a + (b - a) * t;
      const ease = gsap.parseEase("entrada");
      let ultimo = alvo(estado.atual);

      const desenhar = () => {
        const fim = alvo(estado.atual);
        const t = ease(estado.viagem);
        ultimo = {
          x: misturar(estado.de.x, fim.x, t),
          y: misturar(estado.de.y, fim.y, t),
          s: misturar(estado.de.s, fim.s, t),
        };
        gsap.set(ponto, { x: ultimo.x, y: ultimo.y, scale: ultimo.s * estado.pulso, autoAlpha: 1 });
      };

      const irPara = (el: HTMLElement) => {
        if (el === estado.atual) return;
        estado.de = { ...ultimo };
        estado.atual = el;
        gsap.killTweensOf(estado);
        const tl = gsap.timeline();
        tl.fromTo(estado, { viagem: 0 }, { viagem: 1, duration: tempos.entradaLonga, ease: "none" });
        if (el.dataset.pontoCarimbo !== undefined) {
          tl.to(estado, { pulso: tempos.carimboExcesso, duration: tempos.carimbo * 0.6, ease: "entrada" })
            .to(estado, { pulso: 1, duration: tempos.carimbo * 0.4, ease: "saida" });
        }
      };

      const gatilhos = ancoras.map((el) =>
        ScrollTrigger.create({
          trigger: el.closest("[data-cena]") ?? el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (st) => st.isActive && irPara(el),
        }),
      );

      gsap.ticker.add(desenhar);
      return () => {
        gsap.ticker.remove(desenhar);
        gatilhos.forEach((g) => g.kill());
        document.documentElement.classList.remove("ponto-vivo");
        gsap.set(ponto, { autoAlpha: 0 });
      };
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 rounded-pill bg-verde-lima opacity-0 will-change-transform"
      style={{ width: BASE, height: BASE, visibility: "hidden" }}
    />
  );
}
