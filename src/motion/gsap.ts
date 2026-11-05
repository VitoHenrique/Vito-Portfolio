"use client";

/**
 * Registro único do GSAP. Toda ilha importa daqui, nunca direto de "gsap".
 *
 * Núcleo (vai na abertura): gsap, useGSAP e ScrollTrigger, com as curvas da
 * marca registradas como "entrada" e "saida".
 * Todo o resto (SplitText, Flip, DrawSVG, MorphSVG, MotionPath, Draggable,
 * Inertia) vem de `plugins.ts`, sob demanda, para caber na meta de 170 KB de
 * JavaScript na abertura. Todos vêm do pacote gratuito `gsap`.
 * GSDevTools não entra no projeto.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bezier, curvas, tempos } from "./curvas";

let pronto = false;

function iniciar() {
  if (pronto || typeof window === "undefined") return;
  pronto = true;
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  gsap.registerEase("entrada", bezier(...curvas.entrada));
  gsap.registerEase("saida", bezier(...curvas.saida));
  gsap.defaults({ ease: "entrada", duration: tempos.entrada });
  // Celular: a barra de endereço não dispara recálculo a cada rolagem.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Fontes mudam a métrica do texto: recalcula as posições quando chegam.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

iniciar();

/** Único lugar que registra plugin fora do núcleo. Idempotente. */
export function registrar(...plugins: object[]) {
  gsap.registerPlugin(...plugins);
}

export { gsap, useGSAP, ScrollTrigger };
