import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { linkWhatsApp, type PedidoWhatsApp } from "@/conteudo/whatsapp";

/**
 * Pílula da marca. "giz" é o padrão (Chamar no WhatsApp), "lima" é o destaque
 * (Quero o Pro) e "secundario" fica em Grafite Claro. Texto sempre em Grafite
 * sobre Giz e Verde Lima. Área de toque mínima de 44 px.
 */
export type VarianteBotao = "giz" | "lima" | "secundario";

const estilos: Record<VarianteBotao, string> = {
  giz: "bg-giz text-grafite",
  lima: "bg-verde-lima text-grafite",
  secundario: "bg-grafite-claro text-giz border border-linha",
};

export const classeBotao = (variante: VarianteBotao = "giz", extra = "") =>
  [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-3",
    "font-sans text-base font-semibold leading-none tracking-[-0.01em] whitespace-nowrap",
    // só a propriedade `translate` no CSS: o GSAP anima `transform`, sem disputa
    "transition-[translate] duration-200 ease-entrada hover:-translate-y-0.5 active:translate-y-0",
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    estilos[variante],
    extra,
  ].join(" ");

type PropsLink = ComponentPropsWithoutRef<"a"> & { variante?: VarianteBotao; children: ReactNode };

export function Botao({ variante = "giz", className = "", children, ...resto }: PropsLink) {
  return (
    <a className={classeBotao(variante, className)} {...resto}>
      {children}
    </a>
  );
}

type PropsWhatsApp = Omit<PropsLink, "href" | "children"> & {
  pedido?: PedidoWhatsApp;
  /** Seção de onde veio o clique, para o evento whatsapp_click. */
  origem: string;
  children?: ReactNode;
};

/** O único caminho de conversão do site: abre o WhatsApp com a mensagem pronta. */
export function BotaoWhatsApp({ pedido = { tipo: "geral" }, origem, children, ...resto }: PropsWhatsApp) {
  return (
    <Botao
      href={linkWhatsApp(pedido)}
      target="_blank"
      rel="noopener noreferrer"
      data-evento="whatsapp_click"
      data-origem={origem}
      {...resto}
    >
      {children ?? "Chamar no WhatsApp"}
    </Botao>
  );
}
