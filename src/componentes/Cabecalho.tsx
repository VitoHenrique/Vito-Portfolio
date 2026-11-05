import { Wordmark } from "./Wordmark";
import { BotaoWhatsApp } from "./Botao";

const links = [
  { href: "#videos", rotulo: "Vídeos" },
  { href: "#planos", rotulo: "Planos" },
];

/**
 * Cabeçalho fixo: logo, navegação e WhatsApp.
 * Sai de cena na tela verde dos planos (o logo nunca vai sobre o Verde Lima).
 * "Serviços" entra na Fase 3, junto com a cena dos quatro ofícios.
 */
export function Cabecalho() {
  return (
    <header
      data-cabecalho
      className="fixed inset-x-0 top-0 z-30 border-b border-linha bg-grafite pt-[env(safe-area-inset-top)]"
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-3 md:h-[72px] md:px-6">
        <a href="#conteudo" className="-m-2 p-2" aria-label="vito.dev, início">
          <Wordmark largura={160} />
        </a>
        <nav aria-label="Principal" className="flex items-center gap-1 md:gap-2">
          <a
            href="#planos"
            className="corpo-pequeno sr-only rounded-pill px-3 py-2 text-cinza-oliva focus:not-sr-only focus:text-giz"
          >
            Pular para os planos
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="corpo-pequeno inline-flex min-h-11 items-center rounded-pill px-4 text-cinza-oliva transition-colors hover:text-giz"
                >
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <BotaoWhatsApp origem="cabecalho" className="!min-h-10 !px-4 !text-sm md:!min-h-11 md:!px-5">
            <span className="md:hidden">WhatsApp</span>
            <span className="hidden md:inline">Chamar no WhatsApp</span>
          </BotaoWhatsApp>
        </nav>
      </div>
    </header>
  );
}
