import type { ReactNode } from "react";
import { Card } from "@/componentes/Card";
import { ListaMarcada, Losango } from "@/componentes/Marcador";
import { Numero, Rotulo } from "@/componentes/Rotulo";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { TelaVerde } from "@/componentes/TelaVerde";

type Props = {
  cena: string;
  verde: { pesada: string; leve: string; texto: string };
  nome: string;
  itens: ReactNode[];
  origem: string;
};

/**
 * O "plano" de identidade visual e de vídeos: não tem preço público
 * (contexto da marca). Mostra o que vem e leva ao orçamento no WhatsApp.
 */
export function PlanoProjeto({ cena, verde, nome, itens, origem }: Props) {
  return (
    <section id="planos" data-cena={cena} aria-labelledby="titulo-planos" className="relative">
      <TelaVerde {...verde} />
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-3 py-6 md:px-6 md:py-[96px]">
        <Card destaque className="flex max-w-[560px] flex-col gap-4">
          <div className="flex items-center gap-2">
            <Losango />
            <Rotulo tom="lima" as="span">
              Sob medida
            </Rotulo>
          </div>
          <h3 className="subtitulo">{nome}</h3>
          <div className="border-y border-linha py-4">
            <p className="rotulo text-cinza-oliva">Investimento</p>
            <p className="mt-1 text-verde-lima">
              <Numero>Orçamento por projeto</Numero>
            </p>
            <p className="corpo-pequeno mt-2 text-cinza-oliva">Combinado antes de começar, sem surpresa no fim.</p>
          </div>
          <ListaMarcada className="corpo-pequeno text-giz" itens={itens} />
          <BotaoWhatsApp origem={origem} variante="lima" className="self-start">
            Pedir orçamento
          </BotaoWhatsApp>
        </Card>
      </div>
    </section>
  );
}
