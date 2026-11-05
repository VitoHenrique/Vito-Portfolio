"use client";

import { gsap } from "./gsap";
import { tempos } from "./curvas";

/**
 * Assinatura de movimento da marca, igual à dos vídeos:
 * a parte pesada entra antes da leve, e o ponto carimba por último.
 * Movimento por máscara e deslocamento; fade puro não entra.
 *
 * A máscara usa a classe .revela (globals.css): o GSAP anima só o número
 * --revela, e o CSS transforma isso no recorte. Interpolar a string do
 * clip-path direto não era confiável.
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

/** Prepara elementos para a máscara (liga a classe .revela). */
export function mascarar(alvos: Element | Element[] | NodeListOf<Element>) {
  const lista = alvos instanceof Element ? [alvos] : Array.from(alvos);
  lista.forEach((el) => el.classList.add("revela"));
  return lista;
}

/** Entrada por máscara: o elemento sobe de dentro do recorte. */
export function entradaMascara(alvo: Element | Element[] | NodeListOf<Element>, vars: gsap.TweenVars = {}) {
  const lista = mascarar(alvo);
  return gsap.fromTo(
    lista,
    { yPercent: 40, "--revela": 0 },
    { yPercent: 0, "--revela": 1, duration: tempos.entrada, ease: "entrada", ...vars },
  );
}

/** Saída por máscara: sempre mais rápida que a entrada. */
export function saidaMascara(alvo: Element | Element[] | NodeListOf<Element>, vars: gsap.TweenVars = {}) {
  const lista = mascarar(alvo);
  // fromTo: a variável começa vazia, e o GSAP a leria como 0.
  return gsap.fromTo(lista, { "--revela": 1 }, { yPercent: -30, "--revela": 0, duration: tempos.saida, ease: "saida", ...vars });
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
