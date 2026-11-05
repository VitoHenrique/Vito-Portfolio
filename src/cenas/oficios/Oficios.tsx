"use client";

import Link from "next/link";

import { useEffect, useRef, useState, type RefObject } from "react";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Numero } from "@/componentes/Rotulo";
import { Losango } from "@/componentes/Marcador";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { servicos, type IdServico } from "@/conteudo/servicos";
import { Ilustracao } from "./Ilustracoes";

/**
 * Home · "Do que você precisa?": o visitante escolhe o caminho. Cada item
 * leva à página do serviço; "Ainda não sei" cai no WhatsApp. Um único objeto
 * muda de forma (e se monta, animado) conforme o serviço sob o ponteiro.
 * Funciona sem JS: a lista e os links estão no HTML; o objeto mostra "sites".
 */
/**
 * A cada troca, a ilustração se monta: as linhas se desenham (DrawSVG) e as
 * partes cheias carimbam. GSAP e o plugin só carregam na primeira troca.
 */
function useMontarIlustracao(alvo: RefObject<HTMLDivElement | null>, chave: IdServico) {
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    const svg = alvo.current?.querySelector("svg");
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let parar = () => {};
    Promise.all([import("@/motion/gsap"), import("@/motion/plugins")]).then(async ([{ gsap }, { carregar }]) => {
      await carregar.DrawSVG();
      const linhas = svg.querySelectorAll("[stroke]:not([stroke=none])");
      const cheios = svg.querySelectorAll('[fill]:not([fill="none"])');
      const tl = gsap.timeline();
      tl.fromTo(linhas, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, stagger: 0.04, ease: "entrada" }).fromTo(
        cheios,
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, duration: 0.35, stagger: 0.05, ease: "entrada" },
        0.2,
      );
      parar = () => void tl.kill();
    });
    return () => parar();
  }, [alvo, chave]);
}

export function Oficios({ cena = "02" }: { cena?: string }) {
  const [ativo, setAtivo] = useState<IdServico>("sites");
  const quadro = useRef<HTMLDivElement>(null);
  useMontarIlustracao(quadro, ativo);
  return (
    <section id="servicos" data-cena={cena} aria-labelledby="titulo-oficios" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-6">
        <div className="flex flex-col gap-5">
          <TituloDuasVozes id="titulo-oficios" pesada="Do que você precisa?" leve="Escolha por onde começar" className="max-w-[14ch]" />
          <p className="corpo max-w-[44ch] text-cinza-oliva">
            Cada serviço tem a sua página, com exemplos para você ver e mexer. Do logo ao sistema, tudo num lugar só.
          </p>
          <ul className="flex flex-col border-t border-linha">
            {servicos.map((s) => {
              const sel = s.id === ativo;
              return (
                <li key={s.id} className="border-b border-linha">
                  <Link
                    href={s.href}
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
                    <span className="col-start-2 flex flex-col gap-1 md:col-start-auto md:items-end">
                      <Numero className="text-cinza-oliva">{s.preco}</Numero>
                      <span className="corpo-pequeno text-verde-lima">{s.chamada}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Para quem ainda não sabe: a saída é a mesma ação principal, o WhatsApp. */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="corpo-pequeno text-cinza-oliva">Ainda não sabe?</p>
            <BotaoWhatsApp origem="interesse-nao-sei" variante="secundario">
              Me conta o seu negócio
            </BotaoWhatsApp>
          </div>
        </div>
        <div ref={quadro} className="hidden rounded-md border border-linha bg-grafite-claro p-5 md:block" aria-hidden>
          <Ilustracao key={ativo} id={ativo} />
        </div>
      </div>
    </section>
  );
}
