import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { AncoraPonto } from "@/motion/AncoraPonto";
import { CorridaInterativa } from "./CorridaInterativa";

/**
 * Cena 2 · A corrida. Velocidade vira dinheiro, sem jargão.
 * Dois celulares carregam o mesmo site: o lento em Coral e o rápido em Lima.
 * É uma simulação e diz isso na tela. O teste com o link do visitante entra
 * na Fase 4, quando houver a chave da API do PageSpeed.
 */
export function Corrida({ cena = "02" }: { cena?: string }) {
  return (
    <section id="corrida" data-cena={cena} aria-labelledby="titulo-corrida" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-6">
        <div className="relative flex flex-col gap-4">
          <TituloDuasVozes id="titulo-corrida" pesada="Cada segundo" leve="custa cliente" className="max-w-[12ch]" />
          <p className="corpo max-w-[44ch] text-cinza-oliva">
            Quem espera, desiste. Se o site demora, o cliente fecha a aba e chama o próximo da lista. Dispare a corrida
            e veja a diferença no celular.
          </p>
          {/* O Ponto vira cronômetro: pousa aqui, menor, ao lado da corrida. */}
          <AncoraPonto nome="cronometro" carimbo className="mt-2 hidden w-24 md:block lg:w-32" />
        </div>
        <CorridaInterativa />
      </div>
    </section>
  );
}
