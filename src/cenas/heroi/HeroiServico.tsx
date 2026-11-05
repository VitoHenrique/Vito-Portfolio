import type { ReactNode } from "react";
import { Botao, BotaoWhatsApp } from "@/componentes/Botao";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { ListaMarcada } from "@/componentes/Marcador";
import { AncoraPonto } from "@/motion/AncoraPonto";
import type { PedidoWhatsApp } from "@/conteudo/whatsapp";

type Props = {
  pesada: string;
  leve: string;
  texto: string;
  pontos: ReactNode[];
  origem: string;
  pedido?: PedidoWhatsApp;
  /** Link secundário: a primeira demonstração da página. */
  secundario: { href: string; rotulo: string };
};

/**
 * Herói das páginas de serviço: o que é, para quem e o próximo passo,
 * na primeira tela. O H1 aparece no primeiro quadro. O Ponto pousa no
 * canto superior direito, cortado pela borda, como na home.
 */
export function HeroiServico({ pesada, leve, texto, pontos, origem, pedido, secundario }: Props) {
  return (
    <section
      id="heroi"
      data-cena="01"
      aria-labelledby="titulo-heroi"
      // Celular: o conteúdo começa sempre abaixo do Ponto (44vw = fundo do círculo + respiro). Nada de texto em cima dele.
      className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-clip px-3 pb-6 pt-[calc(44vw+env(safe-area-inset-top)+24px)] md:min-h-[90dvh] md:justify-center md:px-6 md:pt-[72px]"
    >
      <AncoraPonto
        nome="heroi"
        ponteiro
        className="absolute -right-[22vw] -top-[20vw] -z-10 w-[64vw] md:-right-[16vw] md:-top-[22vw] md:w-[46vw] lg:-right-[12vw] lg:-top-[18vw] lg:w-[38vw]"
      />
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 md:gap-5">
        <TituloDuasVozes id="titulo-heroi" as="h1" pesada={pesada} leve={leve} className="max-w-[14ch]" />
        <p className="corpo max-w-[46ch] text-cinza-oliva">{texto}</p>
        <ListaMarcada className="corpo-pequeno text-cinza-oliva" itens={pontos} />
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <BotaoWhatsApp origem={origem} pedido={pedido} />
          <Botao variante="secundario" href={secundario.href}>
            {secundario.rotulo}
          </Botao>
        </div>
      </div>
    </section>
  );
}
