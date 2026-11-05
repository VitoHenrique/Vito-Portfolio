"use client";

import { gsap } from "@/motion/gsap";
import { useCena } from "@/motion/usarCena";
import { carimbo, duasVozes, entradaMascara, saidaMascara } from "@/motion/assinatura";
import { tempos } from "@/motion/curvas";

/**
 * Animações de entrada comuns às cenas 2 a 11 (o herói não anima o H1).
 * Cada uma toca uma vez, quando entra na tela. Um "uau" por cena: o título
 * em duas vozes, e no máximo um gesto próprio (a linha do processo, a
 * conversa, o símbolo da identidade). Movimento reduzido: nada anima.
 */
export function AnimacaoCenas() {
  useCena(
    () => document.getElementById("conteudo"),
    (ctx, raiz) => {
      if (ctx === "reduzido") return;
      // A timeline com scrollTrigger também cobre quem já abriu a página com a cena para trás:
      // nesse caso ela toca na hora, e nada fica escondido.
      const aoEntrar = (alvo: Element, tocar: () => gsap.core.Animation, inicio = "top 82%") =>
        void gsap.timeline({ scrollTrigger: { trigger: alvo, start: inicio, once: true, refreshPriority: -1 } }).add(tocar());

      // Títulos em duas vozes de todas as cenas, menos o herói (H1 no primeiro quadro).
      // (O título do fecho fica de fora: ele é a vinheta em loop, mais abaixo.)
      raiz.querySelectorAll("[data-cena]:not(#heroi) h2:not([data-estado]):has([data-voz=pesada])").forEach((t) => {
        if (t.closest("[data-tela-verde]")) return aoEntrar(t, () => duasVozes(t), "top 70%");
        aoEntrar(t, () => duasVozes(t));
      });

      // Cena 6: o símbolo se monta (traços sobem, o losango carimba).
      const simbolo = raiz.querySelector("#identidade [data-simbolo]");
      if (simbolo) {
        const tracos = simbolo.querySelectorAll("[data-traco]");
        const losango = simbolo.querySelector("[data-losango]");
        aoEntrar(simbolo, () => {
          const tl = gsap.timeline();
          tl.add(entradaMascara(tracos, { stagger: tempos.duasVozes.leve }));
          if (losango) tl.add(carimbo(losango), tempos.duasVozes.ponto);
          return tl;
        });
      }

      // Cena 10: a linha desenha as 4 etapas (só transform: scaleX / scaleY).
      const processo = raiz.querySelector("[data-linha-processo]");
      if (processo) {
        const linhas = processo.querySelectorAll("[data-linha]");
        const etapas = processo.querySelectorAll("[data-etapa]");
        gsap.fromTo(
          linhas,
          { scaleX: (i) => (i === 1 ? 0 : 1), scaleY: (i) => (i === 0 ? 0 : 1) },
          { scaleX: 1, scaleY: 1, ease: "none", scrollTrigger: { trigger: processo, start: "top 75%", end: "bottom 55%", scrub: 0.5 } },
        );
        etapas.forEach((e) => aoEntrar(e, () => entradaMascara(e), "top 78%"));
      }

      // Fecho: a vinheta em loop. Frase (pesada, leve, ponto carimba) → respiro → sai →
      // wordmark (vito, dev, ponto carimba) → respiro → sai → recomeça. Pausa fora da tela.
      const vinheta = raiz.querySelector("[data-vinheta-fecho]");
      if (vinheta) {
        const frase = vinheta.querySelector<HTMLElement>("[data-estado=frase]")!;
        const marca = vinheta.querySelector<HTMLElement>("[data-estado=marca]")!;
        const partes = (p: string) => marca.querySelector(`[data-logo-parte="${p}"]`)!;
        const vozes = [frase.querySelector("[data-voz=pesada]")!, frase.querySelector("[data-voz=leve]")!];
        const pontoFrase = frase.querySelector("[data-voz=ponto]")!;
        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.set(marca, { autoAlpha: 0 })
          .set(frase, { autoAlpha: 1 })
          .add(duasVozes(frase))
          .to({}, { duration: 3 })
          .add(saidaMascara(vozes, { stagger: 0.06 }))
          .to(pontoFrase, { scale: 0, duration: tempos.saida, ease: "saida" }, "<")
          .set(frase, { autoAlpha: 0 })
          .set(marca, { autoAlpha: 1 })
          .add(entradaMascara(partes("vito")), ">")
          .add(entradaMascara(partes("dev")), `<${tempos.duasVozes.leve}`)
          .add(carimbo(partes("ponto")), `<${tempos.duasVozes.ponto - tempos.duasVozes.leve}`)
          .to({}, { duration: 2.5 })
          .add(saidaMascara([partes("vito"), partes("dev")], { stagger: 0.06 }))
          .to(partes("ponto"), { scale: 0, duration: tempos.saida, ease: "saida" }, "<")
          .to({}, { duration: 0.25 });
        gsap.timeline({
          scrollTrigger: { trigger: vinheta, start: "top 85%", end: "bottom 10%", onToggle: (st) => (st.isActive ? tl.play() : tl.pause()), refreshPriority: -1 },
        });
      }

      // Cena 10: a conversa chega uma mensagem por vez.
      const conversa = raiz.querySelector("[data-conversa]");
      if (conversa) aoEntrar(conversa, () => entradaMascara(conversa.querySelectorAll("[data-mensagem]"), { stagger: 0.35 }));
    },
  );
  return null;
}
