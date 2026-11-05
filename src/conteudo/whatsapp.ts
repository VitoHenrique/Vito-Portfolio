import { contatos } from "./site";
import { plano, type IdPlano } from "./precos";

/** Cada tipo é uma origem: a mensagem já diz de onde a pessoa veio. */
export type PedidoWhatsApp =
  | { tipo: "geral" }
  | { tipo: "plano"; plano: IdPlano }
  | { tipo: "previa"; negocio: string }
  | { tipo: "video"; negocio: string }
  | { tipo: "velocidade"; segundos: number };

export const LIMITE_NOME = 32;

/** Nome digitado pelo visitante: sem controle, sem espaço duplo, até 32 caracteres. */
export function limparNomeNegocio(bruto: string): string {
  const limpo = bruto
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return [...limpo].slice(0, LIMITE_NOME).join("").trim();
}

const nomeOuPadrao = (bruto: string) => limparNomeNegocio(bruto) || "o meu negócio";

const segundosPt = (s: number) => `${(Math.round(s * 10) / 10).toFixed(1).replace(".", ",")} s`;

export function mensagemWhatsApp(pedido: PedidoWhatsApp): string {
  switch (pedido.tipo) {
    case "geral":
      return "Oi! Vim pelo site e quero saber mais sobre os serviços da vito.dev.";
    case "plano":
      return `Oi! Vim pelo site e tenho interesse no ${plano(pedido.plano).nome}. Como funcionam os próximos passos?`;
    case "previa":
      return `Oi! Montei uma prévia para ${nomeOuPadrao(pedido.negocio)} no site. Podemos conversar?`;
    case "video":
      return `Oi! Vi a vinheta no site e quero um vídeo como esse para ${nomeOuPadrao(pedido.negocio)}.`;
    case "velocidade":
      return `Oi! Testei meu site na vito.dev e ele abriu em ${segundosPt(pedido.segundos)}. O que dá para melhorar?`;
  }
}

export function linkWhatsApp(pedido: PedidoWhatsApp): string {
  return `${contatos.whatsappLink}?text=${encodeURIComponent(mensagemWhatsApp(pedido))}`;
}
