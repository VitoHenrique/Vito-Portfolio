import type { IdServico } from "@/conteudo/servicos";

/**
 * O "objeto único" da cena 3, em quatro formas: navegador, painel, marca e
 * quadro de vídeo. Traço Giz, detalhe Cinza Oliva, acento Verde Lima
 * (o mesmo padrão dos gráficos de linha do Instagram).
 */
const traco = { stroke: "var(--color-giz)", strokeWidth: 3, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const detalhe = { ...traco, stroke: "var(--color-cinza-oliva)", strokeWidth: 2 };

export function Ilustracao({ id }: { id: IdServico }) {
  return (
    <svg viewBox="0 0 320 240" className="h-auto w-full" aria-hidden>
      <rect x="10" y="10" width="300" height="220" rx="16" {...traco} />
      {id === "sites" && (
        <>
          <line x1="10" y1="46" x2="310" y2="46" {...traco} />
          <circle cx="32" cy="28" r="5" {...detalhe} />
          <circle cx="50" cy="28" r="5" {...detalhe} />
          <rect x="80" y="20" width="200" height="16" rx="8" {...detalhe} />
          <rect x="34" y="66" width="140" height="18" rx="4" fill="var(--color-giz)" />
          <rect x="34" y="94" width="110" height="10" rx="3" {...detalhe} />
          <rect x="34" y="166" width="110" height="34" rx="17" fill="var(--color-verde-lima)" />
          <rect x="196" y="66" width="92" height="134" rx="8" {...detalhe} />
        </>
      )}
      {id === "sistemas" && (
        <>
          <rect x="30" y="30" width="80" height="180" rx="8" {...detalhe} />
          {[56, 86, 116, 146].map((y) => (
            <line key={y} x1="46" y1={y} x2="94" y2={y} {...detalhe} />
          ))}
          <rect x="128" y="30" width="162" height="70" rx="8" {...detalhe} />
          <polyline points="140,86 172,64 204,74 236,48 276,56" {...traco} stroke="var(--color-verde-lima)" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={128 + i * 56} y={118} width={46} height={92} rx="8" {...detalhe} />
          ))}
          <rect x="140" y="170" width="22" height="28" fill="var(--color-giz)" />
          <rect x="196" y="150" width="22" height="48" fill="var(--color-giz)" />
          <rect x="252" y="130" width="22" height="68" fill="var(--color-verde-lima)" />
        </>
      )}
      {id === "identidade" && (
        <g transform="translate(110 64) scale(0.9)">
          {/* Símbolo oficial (Encontro), mesma geometria do SVG da marca, sem contorno */}
          <path d="M51.12 35.73 34.12 71.22 0 0h34z" fill="var(--color-giz)" />
          <path d="M71.88 71.22 54.88 35.73 72 0h34z" fill="var(--color-giz)" />
          <path d="M70 75.16 53 110.65 36 75.16 53 39.67z" fill="var(--color-verde-lima)" />
        </g>
      )}
      {id === "videos" && (
        <>
          <rect x="30" y="30" width="260" height="140" rx="10" {...detalhe} />
          <path d="M146 76v48l40-24z" fill="var(--color-verde-lima)" />
          <line x1="30" y1="196" x2="290" y2="196" {...detalhe} />
          <line x1="30" y1="196" x2="150" y2="196" {...traco} stroke="var(--color-verde-lima)" />
          <circle cx="150" cy="196" r="7" fill="var(--color-giz)" />
          <rect x="30" y="210" width="60" height="8" rx="4" {...detalhe} />
          <rect x="100" y="210" width="90" height="8" rx="4" {...detalhe} />
        </>
      )}
    </svg>
  );
}
