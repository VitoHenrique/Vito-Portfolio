"use client";

import { useState } from "react";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Numero } from "@/componentes/Rotulo";
import { Losango } from "@/componentes/Marcador";
import { servicos, type IdServico } from "@/conteudo/servicos";
import { Ilustracao } from "./Ilustracoes";

/**
 * Cena 3 · Quatro ofícios. Um único objeto muda de forma conforme o serviço
 * escolhido (corte seco, sem fade). Cada item leva direto à cena dele.
 * Funciona sem JS: a lista e os links estão no HTML; o objeto mostra "sites".
 */
export function Oficios() {
  const [ativo, setAtivo] = useState<IdServico>("sites");
  return (
    <section id="servicos" data-cena="03" aria-labelledby="titulo-oficios" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-6">
        <div className="flex flex-col gap-5">
          <TituloDuasVozes id="titulo-oficios" pesada="Do logo ao sistema." leve="Tudo num lugar só" className="max-w-[14ch]" />
          <ul className="flex flex-col border-t border-linha">
            {servicos.map((s) => {
              const sel = s.id === ativo;
              return (
                <li key={s.id} className="border-b border-linha">
                  <a
                    href={s.cena}
                    onPointerEnter={() => setAtivo(s.id)}
                    onFocus={() => setAtivo(s.id)}
                    aria-current={sel ? "true" : undefined}
                    className="group grid min-h-11 grid-cols-[16px_1fr] items-baseline gap-3 py-4 md:grid-cols-[16px_1fr_auto]"
                  >
                    <span className={sel ? "" : "invisible"}>
                      <Losango tamanho={8} />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className={`subtitulo ${sel ? "text-giz" : "text-cinza-oliva"} group-hover:text-giz`}>{s.nome}</span>
                      <span className="corpo-pequeno text-cinza-oliva">{s.resumo}</span>
                    </span>
                    <Numero className="col-start-2 text-cinza-oliva md:col-start-auto">{s.preco}</Numero>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden rounded-md border border-linha bg-grafite-claro p-5 md:block" aria-hidden>
          <Ilustracao id={ativo} />
        </div>
      </div>
    </section>
  );
}
