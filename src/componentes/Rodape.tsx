import { Logo } from "./Logo";
import { contatos } from "@/conteudo/site";

/**
 * Rodapé das peças da marca: divisória, wordmark à esquerda e o @ em
 * Martian Mono à direita. Sem cidade. Privacidade e termos entram na Fase 6,
 * junto com as páginas; CNPJ só se o Vito informar.
 */
export function Rodape() {
  return (
    <footer className="px-3 pb-[max(24px,env(safe-area-inset-bottom))] md:px-6 md:pb-[96px]">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 border-t border-linha pt-5">
        <Logo largura={160} />
        <a
          href={contatos.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rotulo inline-flex min-h-11 items-center text-cinza-oliva normal-case hover:text-giz"
        >
          {contatos.instagram}
        </a>
      </div>
    </footer>
  );
}
