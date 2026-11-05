import type { ReactNode } from "react";

/** Lista da marca: ponto Verde Lima no lugar de check ou traço. */
export function ListaMarcada({ itens, className = "" }: { itens: ReactNode[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {itens.map((item, i) => (
        <li key={i} className="flex items-baseline gap-3">
          <Marcador />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Marcador({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-2 shrink-0 translate-y-[-0.1em] rounded-pill bg-verde-lima ${className}`}
    />
  );
}

/** O ponto girado do símbolo. Pequeno: marca item ativo ou abre seção. Nunca junto do Ponto gigante. */
export function Losango({ tamanho = 10, className = "" }: { tamanho?: number; className?: string }) {
  return (
    <svg aria-hidden width={tamanho} height={tamanho * 2.09} viewBox="0 0 34 71" className={className}>
      <path d="M34 35.49 17 70.98 0 35.49 17 0Z" fill="currentColor" className="text-verde-lima" />
    </svg>
  );
}
