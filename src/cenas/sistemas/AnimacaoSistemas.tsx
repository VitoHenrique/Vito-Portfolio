"use client";

import { gsap } from "@/motion/gsap";
import { useCena } from "@/motion/usarCena";
import { mascarar } from "@/motion/assinatura";

/**
 * Cena 5 no desktop: cena presa (pin) de 200 vh. O scroll controla a
 * transformação: as células da planilha voam até os blocos do painel, o
 * Coral some quando a planilha acaba, o login passa e o painel monta.
 * Celular e movimento reduzido: os três quadros ficam lado a lado, sem pin.
 */
export function AnimacaoSistemas() {
  useCena(
    () => document.getElementById("sistemas"),
    (ctx, secao) => {
      if (ctx !== "desktop") return;
      const palco = secao.querySelector<HTMLElement>("[data-palco-sistemas]");
      if (!palco) return;
      palco.dataset.modo = "filme";

      const planilha = palco.querySelector<HTMLElement>("[data-quadro=planilha]")!;
      const login = palco.querySelector<HTMLElement>("[data-quadro=login]")!;
      const painel = palco.querySelector<HTMLElement>("[data-quadro=painel]")!;
      const celulas = gsap.utils.toArray<HTMLElement>("[data-celula]", planilha);
      const widgets = gsap.utils.toArray<HTMLElement>("[data-widget]", painel);
      mascarar([planilha, login, painel, ...widgets]);

      // Para onde cada célula voa: o centro de um bloco do painel (já no mesmo lugar, escondido).
      const destino = (i: number) => {
        const c = celulas[i]!.getBoundingClientRect();
        const w = widgets[i % widgets.length]!.getBoundingClientRect();
        return { x: w.left + w.width / 2 - (c.left + c.width / 2), y: w.top + w.height / 2 - (c.top + c.height / 2) };
      };

      // Valor inicial explícito: sem ele o GSAP lê a variável vazia como 0 e a planilha nasce escondida.
      gsap.set(planilha, { "--revela": 1 });
      gsap.set([login, painel, ...widgets], { "--revela": 0 });
      gsap.set(widgets, { yPercent: 20 });

      gsap
        .timeline({
          defaults: { ease: "entrada" },
          // pinSpacing explícito: dentro de um pai flex o ScrollTrigger desliga o espaço por padrão,
          // e a cena seguinte subia por baixo do palco preso.
          scrollTrigger: { trigger: palco, start: "center center", end: "+=200%", scrub: 0.6, pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true },
        })
        // Sempre fromTo: com invalidateOnRefresh, um .to() regrava o início no meio da cena
        // e, ao voltar a rolagem, a planilha "voltava" para escondida.
        .to({}, { duration: 0.3 }) // respiro: a planilha como ela é
        .fromTo(celulas, { x: 0, y: 0, scale: 1 }, { x: (i) => destino(i).x, y: (i) => destino(i).y, scale: 0.2, stagger: 0.012, duration: 0.3 })
        .fromTo(planilha, { "--revela": 1 }, { "--revela": 0, duration: 0.15, ease: "saida" }, "-=0.12")
        .fromTo(login, { "--revela": 0, yPercent: 0 }, { "--revela": 1, duration: 0.15 }, "<")
        .to({}, { duration: 0.2 })
        .fromTo(login, { "--revela": 1, yPercent: 0 }, { "--revela": 0, yPercent: -6, duration: 0.12, ease: "saida", immediateRender: false })
        .fromTo(painel, { "--revela": 0 }, { "--revela": 1, duration: 0.15 }, "<")
        .fromTo(widgets, { "--revela": 0, yPercent: 20 }, { "--revela": 1, yPercent: 0, stagger: 0.05, duration: 0.2 }, "<0.05")
        .to({}, { duration: 0.2 });

      return () => {
        delete palco.dataset.modo;
        [planilha, login, painel, ...widgets].forEach((el) => el.classList.remove("revela"));
      };
    },
  );
  return null;
}
