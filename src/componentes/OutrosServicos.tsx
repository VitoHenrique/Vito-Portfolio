import Link from "next/link";
import { servicos, type IdServico } from "@/conteudo/servicos";
import { Numero } from "./Rotulo";

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
                <span className="corpo font-semibold">{s.nome}</span>
                <Numero className="text-cinza-oliva">{s.preco}</Numero>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
