import Link from "next/link";
import { servicos, type IdServico } from "@/conteudo/servicos";

/** No fim de cada página de serviço: os outros três caminhos, sem voltar para a home. */
export function OutrosServicos({ atual }: { atual: IdServico }) {
  const outros = servicos.filter((s) => s.id !== atual);
  return (
    <nav aria-label="Outros serviços" className="px-3 pb-6 md:px-6">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 border-t border-linha pt-5">
        <p className="subtitulo">Conheça também</p>
        <ul className="grid gap-2 md:grid-cols-3">
          {outros.map((s) => (
            <li key={s.id}>
              <Link href={s.href} className="flex min-h-11 flex-col gap-1 rounded-md border border-linha bg-grafite-claro p-4 hover:border-giz">
                <span className="corpo flex items-center justify-between gap-3 font-semibold">
                  {s.nome}
                  <svg aria-hidden viewBox="0 0 20 20" className="size-5 shrink-0 text-verde-lima" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </span>
                <span className="corpo-pequeno text-cinza-oliva">{s.resumo}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
