"use client";

import { useEffect, useRef, useState } from "react";
import { Celular } from "@/componentes/Celular";
import { Rotulo } from "@/componentes/Rotulo";
import { classeBotao } from "@/componentes/Botao";

/**
 * A corrida é uma SIMULAÇÃO: os tempos são de exemplo e o rótulo diz isso.
 * O site rápido usa o tempo real desta página no aparelho do visitante quando
 * o navegador informa (LCP); senão, 1,0 s.
 */
const LENTO_S = 5.0;
const RAPIDO_PADRAO_S = 1.0;

type Estado = "parado" | "correndo" | "fim";

function TelaSite({ progresso, cor, pronto }: { progresso: number; cor: "coral" | "lima"; pronto: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3 px-4 pb-4 pt-12">
      <div className="h-1 w-full overflow-hidden rounded-pill bg-grafite-claro">
        <div
          className={`h-full origin-left rounded-pill ${cor === "coral" ? "bg-coral" : "bg-verde-lima"}`}
          style={{ transform: `scaleX(${progresso})` }}
        />
      </div>
      <div className={`flex flex-1 flex-col gap-3 ${pronto ? "" : "opacity-0"}`} aria-hidden={!pronto}>
        <div className="aspect-[4/3] rounded-sm bg-grafite-claro" />
        <p className="subtitulo !text-lg">Barbearia do Bairro</p>
        <p className="corpo-pequeno text-cinza-oliva">Corte e barba com hora marcada.</p>
        <span className="mt-auto rounded-pill bg-giz py-3 text-center text-sm font-semibold text-grafite">
          Chamar no WhatsApp
        </span>
      </div>
      {!pronto && progresso > 0 && (
        <div className="flex flex-1 flex-col gap-3" aria-hidden>
          <div className="aspect-[4/3] rounded-sm border border-linha" />
          <div className="h-4 w-2/3 rounded-sm border border-linha" />
          <div className="h-3 w-1/2 rounded-sm border border-linha" />
        </div>
      )}
    </div>
  );
}

export function CorridaInterativa() {
  const [estado, setEstado] = useState<Estado>("parado");
  const [tempo, setTempo] = useState(0);
  const [rapido, setRapido] = useState(RAPIDO_PADRAO_S);
  const [lado, setLado] = useState<"lento" | "rapido">("lento");
  const quadro = useRef(0);

  // Tempo real desta página, se o navegador informar.
  useEffect(() => {
    if (!PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) return;
    const obs = new PerformanceObserver((l) => {
      const e = l.getEntries().at(-1);
      if (e && e.startTime > 0 && e.startTime < 3000) setRapido(Math.max(0.1, e.startTime / 1000));
    });
    obs.observe({ type: "largest-contentful-paint", buffered: true });
    const t = setTimeout(() => obs.disconnect(), 4000);
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  useEffect(() => () => cancelAnimationFrame(quadro.current), []);

  const disparar = () => {
    cancelAnimationFrame(quadro.current);
    setEstado("correndo");
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = (agora - inicio) / 1000;
      setTempo(Math.min(t, LENTO_S));
      if (t < LENTO_S) quadro.current = requestAnimationFrame(passo);
      else setEstado("fim");
    };
    quadro.current = requestAnimationFrame(passo);
  };

  const p = (limite: number) => (estado === "parado" ? 0 : Math.min(1, tempo / limite));
  const s = (v: number) => `${v.toFixed(1).replace(".", ",")} s`;
  const lentoPronto = tempo >= LENTO_S;
  const rapidoPronto = estado !== "parado" && tempo >= rapido;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 md:hidden" role="tablist" aria-label="Escolha o celular">
        {(["lento", "rapido"] as const).map((l) => (
          <button
            key={l}
            role="tab"
            aria-selected={lado === l}
            onClick={() => setLado(l)}
            className={`corpo-pequeno min-h-11 flex-1 rounded-pill border px-4 ${lado === l ? "border-giz text-giz" : "border-linha text-cinza-oliva"}`}
          >
            {l === "lento" ? "Site lento" : "Site rápido"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <figure className={`flex flex-col items-center gap-3 ${lado === "lento" ? "" : "hidden md:flex"}`}>
          <Celular rotulo="Site lento carregando" className="w-[220px]">
            <TelaSite progresso={p(LENTO_S)} cor="coral" pronto={lentoPronto} />
          </Celular>
          <figcaption className="flex flex-col items-center gap-1">
            <Rotulo tom="coral" as="span">
              Site lento
            </Rotulo>
            <span className="numero text-coral">{s(Math.min(tempo, LENTO_S))}</span>
          </figcaption>
        </figure>
        <figure className={`flex flex-col items-center gap-3 ${lado === "rapido" ? "" : "hidden md:flex"}`}>
          <Celular rotulo="Site rápido carregando" className="w-[220px]">
            <TelaSite progresso={p(rapido)} cor="lima" pronto={rapidoPronto} />
          </Celular>
          <figcaption className="flex flex-col items-center gap-1">
            <Rotulo tom="lima" as="span">
              Site rápido
            </Rotulo>
            <span className="numero text-verde-lima">{s(Math.min(tempo, rapido))}</span>
          </figcaption>
        </figure>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={disparar} className={classeBotao("giz")} disabled={estado === "correndo"}>
          {estado === "parado" ? "Disparar a corrida" : estado === "correndo" ? "Correndo" : "Correr de novo"}
        </button>
        <Rotulo as="span">Simulação</Rotulo>
      </div>
      <p className="corpo-pequeno text-cinza-oliva" aria-live="polite">
        {estado === "fim"
          ? `O rápido abriu em ${s(rapido)}. O lento levou ${s(LENTO_S)}: tempo de sobra para o cliente desistir.`
          : "O site rápido usa o tempo que esta página levou para abrir no seu aparelho."}
      </p>
    </div>
  );
}
