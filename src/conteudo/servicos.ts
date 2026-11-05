/** Os 4 serviços da vito.dev (marca.json). Só sites têm preço público. */
export type IdServico = "sites" | "sistemas" | "identidade" | "videos";

export const servicos: { id: IdServico; nome: string; resumo: string; cena: string; preco: string }[] = [
  {
    id: "sites",
    nome: "Sites",
    resumo: "Do cartão de visita digital ao site institucional, no ar em até 5 dias úteis.",
    cena: "#sites",
    preco: "A partir de R$ 99,90/mês",
  },
  {
    id: "sistemas",
    nome: "Sistemas sob medida",
    resumo: "A planilha vira sistema: estoque, agenda, painel financeiro, área do cliente.",
    cena: "#sistemas",
    preco: "A partir de R$ 1.000",
  },
  {
    id: "identidade",
    nome: "Identidade visual",
    resumo: "Logo em todas as versões, cores, tipografia, peças para redes e manual.",
    cena: "#identidade",
    preco: "Orçamento por projeto",
  },
  {
    id: "videos",
    nome: "Vídeos e animações",
    resumo: "Vídeos curtos para Reels, anúncios e apresentações, com a cara da sua marca.",
    cena: "#videos",
    preco: "Orçamento por projeto",
  },
];
