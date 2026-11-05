import type { Metadata } from "next";
import { Moldura } from "@/componentes/Moldura";
import { OutrosServicos } from "@/componentes/OutrosServicos";
import { HeroiServico } from "@/cenas/heroi/HeroiServico";
import { Sistemas } from "@/cenas/sistemas/Sistemas";
import { Fecho } from "@/cenas/fecho/Fecho";
import { AnimacaoSistemas } from "@/motion/Motor";

export const metadata: Metadata = {
  title: "Sistemas sob medida",
  description:
    "Troque a planilha por um sistema seu: estoque, agenda, pedidos e painel financeiro, com login e acesso por usuário. Implantação a partir de R$ 1.000.",
  alternates: { canonical: "/sistemas" },
};

/** Página de sistemas sob medida: a planilha que vira sistema. */
export default function PaginaSistemas() {
  return (
    <Moldura ilhas={<AnimacaoSistemas />}>
      <HeroiServico
        pesada="Sistemas sob medida"
        leve="para o jeito que você trabalha"
        texto="Começo entendendo como a sua operação funciona hoje e transformo isso numa ferramenta sua, com login seguro e cada pessoa vendo só o que precisa."
        pontos={["Login seguro e usuários admin e funcionário", "Painel com gráficos e dados em tempo real", "Implantação a partir de R$ 1.000, mensalidade sob consulta"]}
        origem="sistemas-heroi"
        pedido={{ tipo: "plano", plano: "sob-medida" }}
        secundario={{ href: "#sistemas", rotulo: "Ver a planilha virar sistema" }}
      />
      <Sistemas cena="02" />
      <Fecho cena="03" perguntas={false} origem="sistemas-fecho" />
      <OutrosServicos atual="sistemas" />
    </Moldura>
  );
}
