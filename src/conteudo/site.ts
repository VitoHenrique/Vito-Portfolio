/** Dados públicos da vito.dev. Fonte: _briefing/marca/marca.json e vito-dev-contexto.md. */
export const contatos = {
  whatsappExibicao: "(21) 95902-0656",
  whatsappLink: "https://wa.me/5521959020656",
  instagram: "@vitodev.oficial",
  instagramLink: "https://instagram.com/vitodev.oficial",
  site: "https://vito-dev.vercel.app",
} as const;

export const marca = {
  nome: "vito.dev",
  slogan: "Seu site no ar. Ponto.",
  titulo: "Criação de sites para pequenos negócios | vito.dev",
  descricao:
    "Site profissional no ar em poucas horas depois do pagamento, com mensalidade fixa. Também faço sistemas, identidade visual e vídeos. Atendimento 100% online.",
} as const;

/**
 * Prazo do site (definido pelo Vito em 05/11/2026): no ar em poucas horas
 * depois do pagamento; com demanda alta, em no máximo 5 dias.
 * Substitui o "5 dias úteis / 5 a 20 dias" do contexto da marca.
 */
export const prazo = {
  curto: "no ar em poucas horas depois do pagamento",
  maximo: "com demanda alta, em no máximo 5 dias",
  frase: "Seu site fica no ar em poucas horas depois do pagamento. Com demanda alta, em no máximo 5 dias.",
} as const;
