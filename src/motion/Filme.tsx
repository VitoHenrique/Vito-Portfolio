"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "./gsap";
import { consultas } from "./usarCena";

/**
 * Linguagem de filme: a borda da tela mostra "CENA 04 · 00:42".
 * O tempo acompanha o scroll; o número da cena troca com corte seco.
 * Cada cena marca a própria seção com data-cena="04".
 * Decorativo: leitores de tela seguem os títulos, não o contador.
 */
const DURACAO_FILME = 180; // segundos de "filme" para a página inteira

const mmss = (s: number) => {
  const t = Math.max(0, Math.round(s));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

export function Filme() {
  const ref = useRef<HTMLDivElement>(null);
  const cena = useRef<HTMLSpanElement>(null);
  const tempo = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${consultas.desktop}, ${consultas.celular}`, () => {
      const cenas = gsap.utils.toArray<HTMLElement>("[data-cena]");
      if (!cenas.length || !ref.current) return;
      gsap.set(ref.current, { autoAlpha: 1 });

      const trocar = (n: string) => {
        if (cena.current && cena.current.textContent !== n) cena.current.textContent = n;
      };
      const gatilhos = cenas.map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (st) => st.isActive && trocar(el.dataset.cena ?? "00"),
        }),
      );
      const relogio = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (st) => {
          if (tempo.current) tempo.current.textContent = mmss(st.progress * DURACAO_FILME);
        },
      });
      return () => {
        gatilhos.forEach((g) => g.kill());
        relogio.kill();
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      aria-hidden
      // Na borda esquerda, em pé, fora da área de leitura. No celular não há margem livre: não aparece.
      className="rotulo pointer-events-none fixed bottom-6 left-1 z-40 hidden rotate-180 text-cinza-oliva opacity-0 [writing-mode:vertical-rl] md:block"
      style={{ visibility: "hidden" }}
    >
      CENA <span ref={cena}>00</span> · <span ref={tempo}>00:00</span>
    </div>
  );
}
