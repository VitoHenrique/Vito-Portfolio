"use client";

import { useId, useState } from "react";
import { Rotulo } from "@/componentes/Rotulo";

/**
 * Antes e depois de "3 logos, 1 empresa" (quadros reais do reel, projeto
 * demonstrativo). Controle deslizante nativo: funciona com teclado e toque.
 */
export function AntesDepois() {
  const [corte, setCorte] = useState(50);
  const id = useId();
  return (
    <figure className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-md border border-linha">
        <picture>
          <source srcSet="/marca/caso/depois.avif" type="image/avif" />
          <img src="/marca/caso/depois.webp" alt="Depois: um logo só na rede social, na fachada e no cartão" width={720} height={606} loading="lazy" decoding="async" className="block h-auto w-full" />
        </picture>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - corte}% 0 0)` }}>
          <picture>
            <source srcSet="/marca/caso/antes.avif" type="image/avif" />
            <img src="/marca/caso/antes.webp" alt="Antes: um logo diferente em cada lugar" width={720} height={606} loading="lazy" decoding="async" className="block h-auto w-full" />
          </picture>
        </div>
        <span aria-hidden className="absolute inset-y-0 w-0.5 bg-giz" style={{ left: `${corte}%` }} />
        <Rotulo tom="coral" as="span" className="absolute left-3 top-3 rounded-pill bg-grafite px-3 py-1">
          Antes
        </Rotulo>
        <Rotulo tom="lima" as="span" className="absolute right-3 top-3 rounded-pill bg-grafite px-3 py-1">
          Depois
        </Rotulo>
      </div>
      <label htmlFor={id} className="sr-only">
        Comparar antes e depois
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={corte}
        onChange={(e) => setCorte(Number(e.currentTarget.value))}
        aria-valuetext={`${corte}% antes, ${100 - corte}% depois`}
        className="regua w-full"
      />
      <figcaption className="corpo-pequeno text-cinza-oliva">
        3 logos, 1 empresa. Padaria Sol, projeto demonstrativo, do reel da vito.dev.
      </figcaption>
    </figure>
  );
}
