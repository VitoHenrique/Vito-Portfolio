import Link from "next/link";
import { Botao, BotaoWhatsApp } from "@/componentes/Botao";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { AncoraPonto } from "@/motion/AncoraPonto";
import { Medidor } from "./Medidor";

/**
 * Cena 1 · Herói. O que é, para quem e o próximo passo em 5 segundos.
 * O H1 está no HTML e aparece no primeiro quadro: nenhuma animação o esconde.
 * O Ponto gigante fica cortado no canto superior direito e reage ao ponteiro.
 */
export function Heroi() {
  return (
    <section
      id="heroi"
      data-cena="01"
      aria-labelledby="titulo-heroi"
      // Celular: o conteúdo começa sempre abaixo do Ponto (48vw = fundo do círculo + respiro). Nada de texto em cima dele.
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-clip px-3 pb-6 pt-[calc(48vw+env(safe-area-inset-top)+24px)] md:min-h-dvh md:justify-center md:px-6 md:pb-6 md:pt-[72px]"
    >
      <AncoraPonto
        nome="heroi"
        ponteiro
        className="absolute -right-[26vw] -top-[22vw] -z-10 w-[70vw] md:-right-[14vw] md:-top-[22vw] md:w-[52vw] lg:-right-[10vw] lg:-top-[18vw] lg:w-[44vw]"
      />
      {/*
        A seta para baixo, sobre a parte visível do Ponto (pedido do Vito): diz "role para ver mais".
        As posições seguem a geometria da âncora acima em cada largura; some ao rolar (Atalhos.tsx).
      */}
      <a
        href="#servicos"
        aria-label="Descer para ver mais"
        className="seta-ponto absolute left-[76vw] top-[32vw] z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill text-grafite md:left-[80vw] md:top-[20vw] md:size-24 lg:top-[18vw]"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="size-12 md:size-20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
        </svg>
      </a>
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 md:gap-5">
        <Medidor />
        <TituloDuasVozes
          id="titulo-heroi"
          as="h1"
          tamanho="display"
          pesada="Seu site no ar."
          leve="Ponto"
          className="max-w-[11ch]"
        />
        <p className="corpo max-w-[44ch] text-cinza-oliva">
          Sites, sistemas, identidade visual e vídeos para pequenos e médios negócios, direto comigo, de onde você
          estiver.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <BotaoWhatsApp origem="heroi" />
          <Botao variante="secundario" href="#servicos">
            Ver exemplos
          </Botao>
          <Link href="/sites#planos" className="corpo-pequeno inline-flex min-h-11 items-center px-2 text-cinza-oliva underline-offset-4 hover:text-giz hover:underline">
            Ver planos
          </Link>
        </div>
      </div>
    </section>
  );
}
