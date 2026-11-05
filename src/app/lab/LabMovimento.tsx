"use client";

import { useRef, useState } from "react";
import { gsap } from "@/motion/gsap";
import { carimbo, duasVozes, entradaMascara, saidaMascara } from "@/motion/assinatura";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { classeBotao } from "@/componentes/Botao";
import { Rotulo } from "@/componentes/Rotulo";

type Demo = "duasVozes" | "entrada" | "saida" | "carimbo";

const nomes: Record<Demo, string> = {
  duasVozes: "duasVozes",
  entrada: "entrada · 0,6 s",
  saida: "saída · 0,3 s",
  carimbo: "carimbo · 0,35 s",
};

/** Bancada do sistema de movimento: cada botão toca um token. */
export function LabMovimento() {
  const palco = useRef<HTMLDivElement>(null);
  const [ultimo, setUltimo] = useState<Demo | null>(null);

  const tocar = (demo: Demo) => {
    const el = palco.current;
    if (!el) return;
    setUltimo(demo);
    gsap.killTweensOf(el.querySelectorAll("*"));
    const titulo = el.querySelector("h3")!;
    const bloco = el.querySelector("[data-bloco]")!;
    const ponto = el.querySelector("[data-ponto-demo]")!;
    gsap.set([bloco, ponto, titulo.querySelectorAll("[data-voz]")], { clearProps: "all" });
    if (demo === "duasVozes") duasVozes(titulo);
    if (demo === "entrada") entradaMascara(bloco);
    if (demo === "saida")
      gsap
        .timeline()
        .add(saidaMascara(bloco))
        .set(bloco, { clearProps: "all" }, "+=0.4");
    if (demo === "carimbo") carimbo(ponto);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-wrap content-start gap-2">
        {(Object.keys(nomes) as Demo[]).map((d) => (
          <button key={d} type="button" onClick={() => tocar(d)} className={classeBotao("secundario")}>
            {nomes[d]}
          </button>
        ))}
        <p aria-live="polite" className="corpo-pequeno w-full pt-2 text-cinza-oliva">
          {ultimo ? `Tocando: ${nomes[ultimo]}` : "Toque um token para ver."}
        </p>
      </div>
      <div ref={palco} className="flex flex-col gap-5 overflow-hidden rounded-md border border-linha p-5">
        <TituloDuasVozes as="h3" pesada="Seu site no ar." leve="Ponto" />
        <div className="flex items-center gap-5">
          <div data-bloco className="rounded-md bg-grafite-claro px-4 py-3">
            <Rotulo>Bloco de teste</Rotulo>
          </div>
          <span data-ponto-demo className="inline-block size-10 rounded-pill bg-verde-lima" />
        </div>
      </div>
    </div>
  );
}
