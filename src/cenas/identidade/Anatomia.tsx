"use client";

import { useState } from "react";

/**
 * Anatomia viva do símbolo Encontro. A geometria é a do SVG oficial
 * (vito-dev_simbolo_positivo.svg), deslocada para começar em 0,0.
 * Tocar ou passar o mouse mostra as 4 medidas do manual.
 */
const medidas = [
  { id: "traco", nome: "Traço", valor: "34% da altura", texto: "A espessura do v da Epilogue 800, a mesma do logo." },
  { id: "respiro", nome: "Respiro", valor: "3,4% da altura", texto: "O espaço que mantém o losango visível em uma cor só." },
  { id: "losango", nome: "Losango", valor: "o ponto girado", texto: "O ponto do vito.dev, girado: a ponta da caneta, o trabalho feito à mão." },
  { id: "proporcao", nome: "Proporção", valor: "106 × 111", texto: "Quase quadrado: cabe em perfil, favicon e ícone de app." },
] as const;
type Medida = (typeof medidas)[number]["id"];

export function Anatomia() {
  const [ativa, setAtiva] = useState<Medida | null>(null);
  const atual = medidas.find((m) => m.id === ativa);
  const guia = { stroke: "var(--color-verde-lima)", strokeWidth: 0.8, fill: "none" } as const;

  return (
    <div className="grid items-center gap-5 md:grid-cols-[1fr_1fr]">
      <div className="mx-auto w-full max-w-[360px] p-6">
        <svg viewBox="-14 -14 134 140" className="h-auto w-full overflow-visible" role="img" aria-label="Símbolo da vito.dev: dois traços que se encontram e um losango verde">
          <g data-simbolo>
            <path data-traco="esquerdo" d="M51.12 35.73 34.12 71.22 0 0h34z" fill="var(--color-giz)" />
            <path data-traco="direito" d="M71.88 71.22 54.88 35.73 72 0h34z" fill="var(--color-giz)" />
            <path data-losango d="M70 75.16 53 110.65 36 75.16 53 39.67z" fill="var(--color-verde-lima)" />
          </g>
          {ativa === "traco" && (
            <g {...guia}>
              <line x1="0" y1="-7" x2="34" y2="-7" />
              <line x1="0" y1="-10" x2="0" y2="-4" />
              <line x1="34" y1="-10" x2="34" y2="-4" />
            </g>
          )}
          {ativa === "respiro" && <circle cx="53" cy="37.7" r="5.5" {...guia} />}
          {ativa === "losango" && <path d="M73 75.16 53 115 33 75.16 53 35.3z" {...guia} strokeDasharray="2 2" />}
          {ativa === "proporcao" && (
            <g {...guia} strokeDasharray="2 2">
              <rect x="0" y="0" width="106" height="110.65" />
            </g>
          )}
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        <ul className="grid grid-cols-2 gap-2">
          {medidas.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                aria-pressed={ativa === m.id}
                onPointerEnter={(e) => e.pointerType === "mouse" && setAtiva(m.id)}
                onFocus={() => setAtiva(m.id)}
                onClick={() => setAtiva(ativa === m.id ? null : m.id)}
                className={`flex min-h-11 w-full flex-col items-start rounded-sm border px-3 py-2 text-left ${ativa === m.id ? "border-verde-lima" : "border-linha"}`}
              >
                <span className="corpo-pequeno font-semibold">{m.nome}</span>
                <span className="numero !text-[13px] text-cinza-oliva">{m.valor}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="corpo-pequeno min-h-[3em] text-cinza-oliva" aria-live="polite">
          {atual ? atual.texto : "Dois traços se encontram para formar o v: a pessoa e o ofício. Toque numa medida."}
        </p>
      </div>
    </div>
  );
}
