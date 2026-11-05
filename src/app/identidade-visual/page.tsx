import type { Metadata } from "next";
import { Moldura } from "@/componentes/Moldura";
import { OutrosServicos } from "@/componentes/OutrosServicos";
import { HeroiServico } from "@/cenas/heroi/HeroiServico";
import { Identidade } from "@/cenas/identidade/Identidade";
import { Instagram } from "@/cenas/instagram/Instagram";
import { Fecho } from "@/cenas/fecho/Fecho";
import { PlanoProjeto } from "@/cenas/planos/PlanoProjeto";

export const metadata: Metadata = {
  title: "Identidade visual",
  description:
    "Logo em todas as versões, cores, tipografia, peças para redes e impressos e um manual simples de uso. Uma marca só, em todo lugar. Orçamento por projeto.",
  alternates: { canonical: "/identidade-visual" },
};

/** Página de identidade visual: a própria vito.dev como caso, e a marca em uso no Instagram. */
export default function PaginaIdentidade() {
  return (
    <Moldura>
      <HeroiServico
        pesada="Identidade visual"
        leve="que o cliente reconhece"
        texto="Logo, cores e fontes definidos uma vez e usados igual no Instagram, na fachada, no cartão e no site. É isso que faz a marca ser lembrada."
        pontos={["Logo em todas as versões", "Peças para redes e impressos", "Manual simples de uso"]}
        origem="identidade-heroi"
        secundario={{ href: "#identidade", rotulo: "Ver a marca por dentro" }}
      />
      <Identidade cena="02" />
      <Instagram cena="03" />
      <PlanoProjeto
        cena="04"
        nome="Identidade visual completa"
        origem="identidade-plano"
        verde={{
          pesada: "Sua marca pronta,",
          leve: "do logo ao manual",
          texto: "Orçamento por projeto, combinado antes de começar. O valor depende do que você já tem hoje.",
        }}
        itens={["Logo em todas as versões", "Cores e tipografia", "Peças para redes e impressos", "Manual simples de uso"]}
      />
      <Fecho cena="05" perguntas={false} origem="identidade-fecho" />
      <OutrosServicos atual="identidade" />
    </Moldura>
  );
}
