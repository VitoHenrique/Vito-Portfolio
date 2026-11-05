"use client";

/**
 * Plugins de cena, carregados sob demanda:
 *   const { Flip } = await carregarPlugins();
 * Cada cena chama isto só quando entra perto da tela.
 */
import { registrar } from "./gsap";

let carregando: Promise<Plugins> | null = null;

type Plugins = {
  Flip: typeof import("gsap/Flip").Flip;
  DrawSVGPlugin: typeof import("gsap/DrawSVGPlugin").DrawSVGPlugin;
  MorphSVGPlugin: typeof import("gsap/MorphSVGPlugin").MorphSVGPlugin;
  MotionPathPlugin: typeof import("gsap/MotionPathPlugin").MotionPathPlugin;
  Draggable: typeof import("gsap/Draggable").Draggable;
  InertiaPlugin: typeof import("gsap/InertiaPlugin").InertiaPlugin;
};

export function carregarPlugins(): Promise<Plugins> {
  carregando ??= Promise.all([
    import("gsap/Flip"),
    import("gsap/DrawSVGPlugin"),
    import("gsap/MorphSVGPlugin"),
    import("gsap/MotionPathPlugin"),
    import("gsap/Draggable"),
    import("gsap/InertiaPlugin"),
  ]).then(([f, d, m, mp, dr, i]) => {
    const p: Plugins = {
      Flip: f.Flip,
      DrawSVGPlugin: d.DrawSVGPlugin,
      MorphSVGPlugin: m.MorphSVGPlugin,
      MotionPathPlugin: mp.MotionPathPlugin,
      Draggable: dr.Draggable,
      InertiaPlugin: i.InertiaPlugin,
    };
    registrar(...Object.values(p));
    return p;
  });
  return carregando;
}
