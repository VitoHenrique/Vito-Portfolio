"use client";

import { gsap } from "./gsap";
import { tempos } from "./curvas";

/**
 * Assinatura de movimento da marca, igual à dos vídeos:
 * a parte pesada entra antes da leve, e o ponto carimba por último.
 * Movimento por máscara e deslocamento; fade puro não entra.
 */

/** Carimbo: 0 → 1,18 → 1 em 0,35 s. Só no ponto. */
export function carimbo(alvo: gsap.TweenTarget, atraso = 0) {
  const tl = gsap.timeline({ delay: atraso });
  tl.fromTo(
    alvo,
    { scale: 0, transformOrigin: "50% 50%" },
    { scale: tempos.carimboExcesso, duration: tempos.carimbo * 0.6, ease: "entrada" },
  ).to(alvo, { scale: 1, duration: tempos.carimbo * 0.4, ease: "saida" });
  return tl;
}

/** Entrada por máscara: o elemento sobe de dentro de um recorte. */
export function entradaMascara(alvo: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    alvo,
    { yPercent: 110, clipPath: "inset(0% 0% 100% 0%)" },
    { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: tempos.entrada, ease: "entrada", ...vars },
  );
}

/**
 * Título em duas vozes (TituloDuasVozes): pesada em 0, leve em +0,12 s,
 * ponto em +0,28 s com carimbo. Devolve a timeline para encaixar em cena.
 */
export function duasVozes(titulo: Element) {
  const pesada = titulo.querySelector("[data-voz=pesada]");
  const leve = titulo.querySelector("[data-voz=leve]");
  const ponto = titulo.querySelector("[data-voz=ponto]");
  const tl = gsap.timeline();
  if (pesada) tl.add(entradaMascara(pesada), tempos.duasVozes.pesada);
  if (leve) tl.add(entradaMascara(leve), tempos.duasVozes.leve);
  if (ponto) tl.add(carimbo(ponto), tempos.duasVozes.ponto);
  return tl;
}
