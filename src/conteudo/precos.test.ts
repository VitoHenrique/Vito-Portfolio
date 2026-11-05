import { describe, expect, it } from "vitest";
import { formatarReais, planos, totalEm12Meses } from "./precos";

const nbsp = " ";

describe("formatarReais", () => {
  it("usa vírgula decimal, ponto de milhar e espaço que não quebra", () => {
    expect(formatarReais(99.9)).toBe(`R$${nbsp}99,90`);
    expect(formatarReais(1398.8)).toBe(`R$${nbsp}1.398,80`);
    expect(formatarReais(1000)).toBe(`R$${nbsp}1.000,00`);
    expect(formatarReais(200)).toBe(`R$${nbsp}200,00`);
  });

  it("arredonda centavos sem erro de ponto flutuante", () => {
    expect(formatarReais(0.1 + 0.2)).toBe(`R$${nbsp}0,30`);
    expect(formatarReais(12 * 199.9)).toBe(`R$${nbsp}2.398,80`);
  });
});

describe("planos", () => {
  it("segue exatamente o planos.json oficial", () => {
    expect(planos.map((p) => p.id)).toEqual(["inicial", "pro", "sob-medida"]);
    const [inicial, pro, sob] = planos;
    expect(inicial).toMatchObject({ implantacao: 200, mensalidade: 99.9 });
    expect(pro).toMatchObject({ implantacao: 400, mensalidade: 199.9 });
    expect(sob).toMatchObject({ implantacaoAPartirDe: 1000, mensalidade: null });
  });
});

describe("totalEm12Meses", () => {
  it("soma a implantação e 12 mensalidades", () => {
    expect(totalEm12Meses("inicial")).toBe(1398.8);
    expect(totalEm12Meses("pro")).toBe(2798.8);
  });

  it("não calcula total para o sistema sob medida", () => {
    expect(totalEm12Meses("sob-medida")).toBeNull();
  });
});
