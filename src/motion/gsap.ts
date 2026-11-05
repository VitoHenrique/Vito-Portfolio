"use client";

/**
 * Registro único do GSAP. Toda ilha importa daqui, nunca direto de "gsap".
 *
 * Núcleo (vai na abertura): gsap, useGSAP, ScrollTrigger, SplitText e CustomEase.
 * Plugins de cena (Flip, DrawSVG, MorphSVG, MotionPath, Draggable, Inertia) ficam
 * em `plugins.ts` e só carregam quando a cena se aproxima, para caber na meta de
 * 170 KB de JavaScript na abertura. Todos vêm do pacote gratuito `gsap`.
 * GSDevTools não entra no projeto.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { curvas, tempos } from "./curvas";

let pronto = false;

function iniciar() {
  if (pronto || typeof window === "undefined") return;
  pronto = true;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("entrada", curvas.entrada);
  CustomEase.create("saida", curvas.saida);
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

export { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase };
