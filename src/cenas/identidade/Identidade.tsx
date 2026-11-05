import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { ListaMarcada } from "@/componentes/Marcador";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { Anatomia } from "./Anatomia";
import { AntesDepois } from "./AntesDepois";
import { Aplicacoes } from "./Aplicacoes";

/**
 * Cena 6 · Identidade visual. A própria vito.dev é o primeiro caso:
 * identidade não é só logo, é um sistema que funciona em todo lugar.
 * Sem preço: "Pedir orçamento" abre o WhatsApp. Casos de clientes só
 * entram depois de autorizados (casos.ts).
 */
export function Identidade({ cena = "06" }: { cena?: string }) {
  return (
    <section id="identidade" data-cena={cena} aria-labelledby="titulo-identidade" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 md:gap-[96px]">
        <div className="flex flex-col gap-4">
          <TituloDuasVozes id="titulo-identidade" pesada="Uma marca só," leve="em todo lugar" className="max-w-[13ch]" />
          <p className="corpo max-w-[50ch] text-cinza-oliva">
            Identidade visual é definir uma vez o logo, as cores e as fontes e usar igual em tudo. O primeiro caso é a
            própria vito.dev.
          </p>
          <Anatomia />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-3">
            <h3 className="subtitulo">Antes e depois</h3>
            <p className="corpo text-cinza-oliva">Arraste e veja três logos virarem um.</p>
            <AntesDepois />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="subtitulo">Tudo no lugar</h3>
            <p className="corpo text-cinza-oliva">Um sistema só, aplicado em cada peça.</p>
            <Aplicacoes />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-linha pt-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="subtitulo">O que vem no pacote</h3>
            <ListaMarcada
              className="corpo text-cinza-oliva"
              itens={["Logo em todas as versões", "Cores e tipografia", "Peças para redes e impressos", "Manual simples de uso"]}
            />
          </div>
          <BotaoWhatsApp origem="identidade" className="self-start md:self-auto">
            Pedir orçamento
          </BotaoWhatsApp>
        </div>
      </div>
    </section>
  );
}
