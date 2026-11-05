"use client";

/**
 * Plugins de cena, carregados sob demanda e registrados por `registrar()`:
 *   const SplitText = await carregar.SplitText();
 * Cada cena chama só o que usa, quando entra perto da tela.
 */
import { registrar } from "./gsap";

function sobDemanda<T extends object>(importar: () => Promise<T>) {
  let promessa: Promise<T> | null = null;
  return () =>
    (promessa ??= importar().then((plugin) => {
      registrar(plugin);
      return plugin;
    }));
}

export const carregar = {
  SplitText: sobDemanda(() => import("gsap/SplitText").then((m) => m.SplitText)),
  Flip: sobDemanda(() => import("gsap/Flip").then((m) => m.Flip)),
  DrawSVG: sobDemanda(() => import("gsap/DrawSVGPlugin").then((m) => m.DrawSVGPlugin)),
  MorphSVG: sobDemanda(() => import("gsap/MorphSVGPlugin").then((m) => m.MorphSVGPlugin)),
  MotionPath: sobDemanda(() => import("gsap/MotionPathPlugin").then((m) => m.MotionPathPlugin)),
  Draggable: sobDemanda(() => import("gsap/Draggable").then((m) => m.Draggable)),
  Inertia: sobDemanda(() => import("gsap/InertiaPlugin").then((m) => m.InertiaPlugin)),
};
