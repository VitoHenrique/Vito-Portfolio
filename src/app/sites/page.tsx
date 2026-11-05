import type { Metadata } from "next";
import { Moldura } from "@/componentes/Moldura";
import { OutrosServicos } from "@/componentes/OutrosServicos";
import { HeroiServico } from "@/cenas/heroi/HeroiServico";
import { Corrida } from "@/cenas/corrida/Corrida";
import { Sites } from "@/cenas/sites/Sites";
import { Planos } from "@/cenas/planos/Planos";
import { Fecho } from "@/cenas/fecho/Fecho";

export const metadata: Metadata = {
  title: "Criação de sites para pequenos negócios",
  description:
    "Site profissional feito em código, no ar em poucas horas depois do pagamento, com mensalidade fixa a partir de R$ 99,90. Hospedagem, domínio e alterações inclusos.",
  alternates: { canonical: "/sites" },
};

/** Página de sites: o produto de entrada. Velocidade, prévia do site do visitante, planos e FAQ. */
export default function PaginaSites() {
  return (
    <Moldura>
      <HeroiServico
        pesada="Seu site no ar"
        leve="em poucas horas"
        texto="Do cartão de visita digital ao site institucional, feito em código e com mensalidade fixa. Hospedagem, domínio e alterações inclusos."
        pontos={["Com demanda alta, em no máximo 5 dias", "Botão de WhatsApp, mapa e SEO básico", "A partir de R$ 99,90 por mês"]}
        origem="sites-heroi"
        secundario={{ href: "#sites", rotulo: "Montar uma prévia" }}
      />
      <Corrida cena="02" />
      <Sites cena="03" />
      <Planos cena="04" ids={["inicial", "pro"]} />
      <Fecho cena="05" origem="sites-fecho" />
      <OutrosServicos atual="sites" />
    </Moldura>
  );
}
