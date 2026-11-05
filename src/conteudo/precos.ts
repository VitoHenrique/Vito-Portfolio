import dados from "./planos.json";

/** Preços oficiais. Mudou preço? Atualize `planos.json` (a mesma fonte do Instagram). */
export type IdPlano = "inicial" | "pro" | "sob-medida";

export type Plano = {
  id: IdPlano;
  nome: string;
  produto: string;
  /** Valor fixo de implantação, ou null quando é "a partir de". */
  implantacao: number | null;
  implantacaoAPartirDe: number | null;
  /** null = sob consulta. */
  mensalidade: number | null;
};

type PlanoJson = {
  id: string;
  nome: string;
  produto: string;
  implantacao?: number;
  implantacao_a_partir_de?: number;
  mensalidade: number | null;
};

export const planos: readonly Plano[] = (dados.planos as PlanoJson[]).map((p) => ({
  id: p.id as IdPlano,
  nome: p.nome,
  produto: p.produto,
  implantacao: p.implantacao ?? null,
  implantacaoAPartirDe: p.implantacao_a_partir_de ?? null,
  mensalidade: p.mensalidade,
}));

export function plano(id: IdPlano): Plano {
  const encontrado = planos.find((p) => p.id === id);
  if (!encontrado) throw new Error(`Plano desconhecido: ${id}`);
  return encontrado;
}

/** Trabalha em centavos para não acumular erro de ponto flutuante. */
const centavos = (valor: number) => Math.round(valor * 100);

/** "R$ 1.398,80", com espaço que não quebra entre R$ e o número. */
export function formatarReais(valor: number): string {
  const total = centavos(valor);
  const inteiro = Math.floor(Math.abs(total) / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const resto = (Math.abs(total) % 100).toString().padStart(2, "0");
  return `${total < 0 ? "-" : ""}R$ ${inteiro},${resto}`;
}

/** Implantação + 12 mensalidades. null quando não há preço fechado. */
export function totalEm12Meses(id: IdPlano): number | null {
  const p = plano(id);
  if (p.implantacao === null || p.mensalidade === null) return null;
  return (centavos(p.implantacao) + 12 * centavos(p.mensalidade)) / 100;
}
