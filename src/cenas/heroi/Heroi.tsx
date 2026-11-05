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
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-clip px-3 pb-6 pt-[calc(64px+env(safe-area-inset-top))] md:min-h-dvh md:justify-center md:px-6 md:pb-6 md:pt-[72px]"
    >
      <AncoraPonto
        nome="heroi"
        ponteiro
        className="absolute -right-[34vw] -top-[18vw] -z-10 w-[86vw] md:-right-[14vw] md:-top-[22vw] md:w-[52vw] lg:-right-[10vw] lg:-top-[18vw] lg:w-[44vw]"
      />
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
          <a href="#planos" className="corpo-pequeno inline-flex min-h-11 items-center px-2 text-cinza-oliva underline-offset-4 hover:text-giz hover:underline">
            Ver planos
          </a>
        </div>
      </div>
    </section>
  );
}
