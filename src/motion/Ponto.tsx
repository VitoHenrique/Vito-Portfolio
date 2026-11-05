"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "./gsap";
import { consultas } from "./usarCena";
import { abertura, tempos } from "./curvas";

/**
 * O Ponto: o único ponto gigante do site, e ele viaja.
 *
 * Cada cena declara uma âncora (<AncoraPonto>), que já é um círculo Verde
 * Lima no HTML: sem JS, ou com movimento reduzido, cada cena mostra o seu
 * grafismo estático. Com movimento, a classe `ponto-vivo` esconde as âncoras
 * e este elemento fixo assume: viaja de uma âncora a outra e fica preso a ela.
 *
 * Na abertura (cena 0), ele nasce do ponto do logo e cresce até o herói.
 */
const BASE = 1000; // px. Desenha grande e reduz com scale: a borda fica sempre nítida.
const INCLINACAO = 0.015; // quanto o Ponto do herói segue o ponteiro (fração da tela)

export function Ponto() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ponto = ref.current;
    if (!ponto) return;
    const mm = gsap.matchMedia();

    mm.add({ movimento: `${consultas.desktop}, ${consultas.celular}`, desktop: consultas.desktop }, (ctx) => {
      if (!ctx.conditions?.movimento) return;
      const html = document.documentElement;
      const ancoras = gsap.utils.toArray<HTMLElement>("[data-ponto]");
      if (!ancoras.length) return;
      html.classList.add("ponto-vivo");

      const alvo = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - BASE / 2, y: r.top + r.height / 2 - BASE / 2, s: r.width / BASE };
      };
      const misturar = (a: number, b: number, t: number) => a + (b - a) * t;
      const ease = gsap.parseEase("entrada");

      const estado = { atual: ancoras[0]!, de: alvo(ancoras[0]!), viagem: 1, pulso: 1 };
      const inclinacao = { x: 0, y: 0 };
      let ultimo = { ...estado.de };
      let assinatura = "";

      const desenhar = () => {
        const fim = alvo(estado.atual);
        const t = ease(estado.viagem);
        const seguir = estado.atual.dataset.pontoPonteiro !== undefined ? 1 : 0;
        ultimo = {
          x: misturar(estado.de.x, fim.x, t) + inclinacao.x * seguir,
          y: misturar(estado.de.y, fim.y, t) + inclinacao.y * seguir,
          s: misturar(estado.de.s, fim.s, t),
        };
        const s = ultimo.s * estado.pulso;
        const chave = `${ultimo.x.toFixed(1)}|${ultimo.y.toFixed(1)}|${s.toFixed(4)}`;
        if (chave === assinatura) return; // nada mudou: não toca no DOM
        assinatura = chave;
        gsap.set(ponto, { x: ultimo.x, y: ultimo.y, scale: s, autoAlpha: s > 0.0005 ? 1 : 0 });
      };

      const viajar = (duracao: number = tempos.entradaLonga, atraso = 0) => {
        gsap.killTweensOf(estado);
        const tl = gsap.timeline({ delay: atraso });
        tl.fromTo(estado, { viagem: 0 }, { viagem: 1, duration: duracao, ease: "none" });
        if (estado.atual.dataset.pontoCarimbo !== undefined) {
          tl.to(estado, { pulso: tempos.carimboExcesso, duration: tempos.carimbo * 0.6, ease: "entrada" }).to(
            estado,
            { pulso: 1, duration: tempos.carimbo * 0.4, ease: "saida" },
          );
        }
        return tl;
      };

      const irPara = (el: HTMLElement) => {
        if (el === estado.atual) return;
        estado.de = { ...ultimo };
        estado.atual = el;
        viajar();
      };

      // Cena 0: o Ponto nasce do ponto do logo, acima do cabeçalho, e desce até o herói.
      const origem = document.querySelector("[data-ponto-origem]");
      let pular = () => {};
      if (html.classList.contains("abertura") && origem) {
        estado.de = alvo(origem);
        estado.viagem = 0;
        gsap.set(ponto, { zIndex: 40 });
        const tl = viajar(abertura.viagem, abertura.saidaDoLogo);
        // Corte seco para trás do cabeçalho quando o Ponto já saiu da faixa do logo.
        tl.call(() => void gsap.set(ponto, { zIndex: 0 }), [], abertura.viagem * 0.35);
        pular = () => {
          tl.progress(1);
          gsap.set(ponto, { zIndex: 0 });
        };
        window.addEventListener("vd:pular-abertura", pular, { once: true });
      }

      const gatilhos = ancoras.map((el) =>
        ScrollTrigger.create({
          trigger: el.closest("[data-cena]") ?? el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (st) => st.isActive && irPara(el),
        }),
      );

      // Desktop: o Ponto do herói se inclina de leve na direção do ponteiro.
      let soltarPonteiro = () => {};
      if (ctx.conditions?.desktop) {
        const qx = gsap.quickTo(inclinacao, "x", { duration: 0.8, ease: "entrada" });
        const qy = gsap.quickTo(inclinacao, "y", { duration: 0.8, ease: "entrada" });
        const mover = (e: PointerEvent) => {
          qx((e.clientX / innerWidth - 0.5) * innerWidth * INCLINACAO * 2);
          qy((e.clientY / innerHeight - 0.5) * innerHeight * INCLINACAO * 2);
        };
        window.addEventListener("pointermove", mover, { passive: true });
        soltarPonteiro = () => window.removeEventListener("pointermove", mover);
      }

      gsap.ticker.add(desenhar);
      return () => {
        gsap.ticker.remove(desenhar);
        gatilhos.forEach((g) => g.kill());
        soltarPonteiro();
        window.removeEventListener("vd:pular-abertura", pular);
        html.classList.remove("ponto-vivo");
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
