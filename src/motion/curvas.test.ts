import { describe, expect, it } from "vitest";
import { bezier, curvas } from "./curvas";

describe("bezier", () => {
  const entrada = bezier(...curvas.entrada);
  const saida = bezier(...curvas.saida);

  it("começa em 0 e termina em 1", () => {
    expect(entrada(0)).toBe(0);
    expect(entrada(1)).toBe(1);
    expect(saida(0)).toBe(0);
    expect(saida(1)).toBe(1);
  });

  it("entrada acelera no começo e saída no fim", () => {
    expect(entrada(0.5)).toBeGreaterThan(0.9);
    expect(saida(0.5)).toBeLessThan(0.2);
  });

  it("é monotônica", () => {
    let anterior = 0;
    for (let i = 1; i <= 100; i++) {
      const v = entrada(i / 100);
      expect(v).toBeGreaterThanOrEqual(anterior - 1e-9);
      anterior = v;
    }
  });

  it("bate com a cubic-bezier linear", () => {
    const linear = bezier(0, 0, 1, 1);
    expect(linear(0.37)).toBeCloseTo(0.37, 5);
  });
});
