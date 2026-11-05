/** Os 4 serviços da vito.dev (marca.json). Só sites têm preço público. Cada um tem a sua página. */
export type IdServico = "sites" | "sistemas" | "identidade" | "videos";

export const servicos: { id: IdServico; nome: string; resumo: string; href: string; preco: string; chamada: string }[] = [
  {
    id: "sites",
    nome: "Sites",
    resumo: "Do cartão de visita digital ao site institucional, no ar em poucas horas depois do pagamento.",
    href: "/sites",
    preco: "A partir de R$ 99,90/mês",
    chamada: "Ver sites",
  },
  {
    id: "sistemas",
    nome: "Sistemas sob medida",
    resumo: "A planilha vira sistema: estoque, agenda, painel financeiro, área do cliente.",
    href: "/sistemas",
    preco: "A partir de R$ 1.000",
    chamada: "Ver sistemas",
  },
  {
    id: "identidade",
    nome: "Identidade visual",
    resumo: "Logo em todas as versões, cores, tipografia, peças para redes e manual.",
    href: "/identidade-visual",
    preco: "Orçamento por projeto",
    chamada: "Ver identidade visual",
  },
  {
    id: "videos",
    nome: "Vídeos e animações",
    resumo: "Vídeos curtos para Reels, anúncios e apresentações, com a cara da sua marca.",
    href: "/videos",
    preco: "Orçamento por projeto",
    chamada: "Ver vídeos",
  },
];
