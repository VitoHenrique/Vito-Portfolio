import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { BotaoWhatsApp } from "./Botao";
import { servicos } from "@/conteudo/servicos";

const curtos = { sites: "Sites", sistemas: "Sistemas", identidade: "Identidade visual", videos: "Vídeos" } as const;
const links = [...servicos.map((s) => ({ href: s.href, rotulo: curtos[s.id] })), { href: "/#planos", rotulo: "Planos" }];

/**
 * Cabeçalho fixo: logo, os 4 serviços (cada um com a sua página), planos e
 * WhatsApp, que é a ação principal e fica sempre visível. No celular, os
 * links abrem num <details> (sem JavaScript).
 * Sai de cena na tela verde dos planos (o logo nunca vai sobre o Verde Lima).
 */
export function Cabecalho() {
  return (
    <header
      data-cabecalho
      className="fixed inset-x-0 top-0 z-30 border-b border-linha bg-grafite pt-[env(safe-area-inset-top)]"
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-2 px-3 md:h-[72px] md:gap-4 md:px-6">
        <Link href="/" className="-m-2 p-2" aria-label="vito.dev, início">
          <Wordmark largura={160} />
        </Link>
        <nav aria-label="Principal" className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <Link href="/#planos" className="corpo-pequeno sr-only rounded-pill px-3 py-2 text-cinza-oliva focus:not-sr-only focus:text-giz">
            Pular para os planos
          </Link>
          <a href="#fecho" className="corpo-pequeno sr-only rounded-pill px-3 py-2 text-cinza-oliva focus:not-sr-only focus:text-giz">
            Ir para o fim (atalho: tecla ponto)
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="corpo-pequeno inline-flex min-h-11 items-center rounded-pill px-3 text-cinza-oliva transition-colors hover:text-giz">{l.rotulo}</Link>
              </li>
            ))}
          </ul>
          <details className="group relative lg:hidden">
            <summary className="flex min-h-10 cursor-pointer list-none items-center rounded-pill border border-linha px-3 text-sm text-giz [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Fechar</span>
            </summary>
            <ul className="absolute right-0 top-[calc(100%+8px)] flex w-56 flex-col rounded-md border border-linha bg-grafite-claro p-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="corpo flex min-h-11 items-center rounded-sm px-3 hover:bg-grafite">{l.rotulo}</Link>
                </li>
              ))}
            </ul>
          </details>
          <BotaoWhatsApp origem="cabecalho" className="!min-h-10 !px-3 !text-sm md:!min-h-11 md:!px-5">
            <span className="md:hidden">WhatsApp</span>
            <span className="hidden md:inline">Chamar no WhatsApp</span>
          </BotaoWhatsApp>
        </nav>
      </div>
    </header>
  );
}
