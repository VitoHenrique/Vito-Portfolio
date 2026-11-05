import type { ReactNode } from "react";
import { contatos } from "@/conteudo/site";

/**
 * O glifo do Instagram em linha, em Giz: deixa claro que o link sai para o
 * Instagram (pedido do Vito). Só em links para o perfil ou post real; a
 * simulação do perfil continua sem o logo do app.
 */
export function IconeInstagram({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type Props = {
  href?: string;
  children?: ReactNode;
  className?: string;
};

/** Link para o Instagram com o glifo ao lado. Abre em nova aba. */
export function LinkInstagram({ href = contatos.instagramLink, children = contatos.instagram, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-2 text-giz underline-offset-4 hover:underline ${className}`}
    >
      <IconeInstagram />
      <span>{children}</span>
      <span className="sr-only"> (abre o Instagram)</span>
    </a>
  );
}
