import { BotaoWhatsApp } from "@/componentes/Botao";
import { AncoraPonto } from "@/motion/AncoraPonto";
import { faq } from "@/conteudo/faq";

/**
 * Cena 11 · Perguntas e fecho. Matar objeções e fechar.
 * O FAQ usa <details>: abre por teclado e funciona sem JS.
 * No fecho, o Ponto encolhe e carimba: vira o ponto final de
 * "Seu site no ar. Ponto." (a âncora fica exatamente sobre o ponto).
 */
type Props = {
  cena?: string;
  /** false nas páginas de serviço que não precisam do FAQ inteiro. */
  perguntas?: boolean;
  /** Origem do clique no botão final (evento whatsapp_click). */
  origem?: string;
};

export function Fecho({ cena = "11", perguntas = true, origem = "fecho" }: Props) {
  return (
    <section id="perguntas" data-cena={cena} aria-labelledby={perguntas ? "titulo-faq" : "titulo-fecho"} className="relative px-3 pt-6 md:px-6 md:pt-[120px]">
      {perguntas && (
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5">
        <h2 id="titulo-faq" className="titulo">
          Perguntas
        </h2>
        <div className="flex flex-col border-t border-linha">
          {faq.map((f) => (
            <details key={f.pergunta} className="group border-b border-linha">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                <span className="subtitulo !text-lg md:!text-xl">{f.pergunta}</span>
                <span aria-hidden className="numero shrink-0 text-cinza-oliva group-open:text-verde-lima">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="corpo max-w-[62ch] pb-5 text-cinza-oliva">{f.resposta}</p>
            </details>
          ))}
        </div>
      </div>
      )}

      <div id="fecho" data-gatilho-ponto className="mx-auto flex min-h-[80svh] max-w-[1320px] flex-col justify-center gap-5 py-6 md:py-[120px]">
        <h2 id="titulo-fecho" tabIndex={-1} className="display text-balance text-giz outline-none">
          <span className="inline-block">Seu site no ar.</span>{" "}
          <span className="titulo-leve inline-block">
            Ponto
            <span className="relative inline-block text-verde-lima">
              .
              {/* O Ponto pousa aqui: um círculo do tamanho do ponto final. */}
              <AncoraPonto nome="fecho" carimbo className="absolute bottom-[0.16em] left-[0.03em] w-[0.19em]" />
            </span>
          </span>
        </h2>
        <p className="corpo max-w-[44ch] text-cinza-oliva">Me conta qual é o seu negócio. Eu te respondo pelo WhatsApp.</p>
        <BotaoWhatsApp origem={origem} variante="lima" className="self-start">
          Chamar no WhatsApp
        </BotaoWhatsApp>
      </div>
    </section>
  );
}
