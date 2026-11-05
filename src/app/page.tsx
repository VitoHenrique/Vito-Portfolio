import { Logo } from "@/componentes/Logo";
import { Botao, BotaoWhatsApp } from "@/componentes/Botao";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { AncoraPonto } from "@/motion/AncoraPonto";

/**
 * Home provisória da Fase 1 (só na branch site-2026).
 * As cenas 0, 1 e 8 entram na Fase 2; o resto na Fase 3.
 */
export default function Home() {
  return (
    <main id="conteudo" className="relative isolate min-h-dvh overflow-hidden px-3 md:px-6">
      <AncoraPonto
        nome="heroi"
        className="absolute -right-[28vmin] -top-[28vmin] -z-10 w-[58vmin] md:-right-[20vmin] md:-top-[22vmin]"
      />
      <header className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 py-4">
        <Logo largura={160} prioridade />
      </header>
      <section className="mx-auto flex min-h-[calc(100dvh-96px)] max-w-[1280px] flex-col justify-center gap-5 pb-6">
        <TituloDuasVozes as="h1" tamanho="display" pesada="Seu site no ar." leve="Ponto" className="max-w-[12ch]" />
        <p className="corpo max-w-[46ch] text-cinza-oliva">
          Sites, sistemas, identidade visual e vídeos para pequenos e médios negócios, direto comigo, de onde você
          estiver.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <BotaoWhatsApp origem="heroi" />
          <Botao variante="secundario" href="/lab">
            Ver a fundação
          </Botao>
        </div>
      </section>
    </main>
  );
}
