import { describe, expect, it } from "vitest";
import { limparNomeNegocio, linkWhatsApp, mensagemWhatsApp } from "./whatsapp";

const base = "https://wa.me/5521959020656?text=";

describe("mensagemWhatsApp", () => {
  it("tem a mensagem geral do briefing", () => {
    expect(mensagemWhatsApp({ tipo: "geral" })).toBe(
      "Oi! Vim pelo site e quero saber mais sobre os serviços da vito.dev.",
    );
  });

  it("leva o nome do plano", () => {
    expect(mensagemWhatsApp({ tipo: "plano", plano: "pro" })).toBe(
      "Oi! Vim pelo site e tenho interesse no Pacote Pro. Como funcionam os próximos passos?",
    );
    expect(mensagemWhatsApp({ tipo: "plano", plano: "sob-medida" })).toBe(
      "Oi! Vim pelo site e tenho interesse no Sistema sob medida. Como funcionam os próximos passos?",
    );
  });

  it("leva o nome do negócio na prévia e no vídeo", () => {
    expect(mensagemWhatsApp({ tipo: "previa", negocio: "Padaria Sol" })).toBe(
      "Oi! Montei uma prévia para Padaria Sol no site. Podemos conversar?",
    );
    expect(mensagemWhatsApp({ tipo: "video", negocio: "Padaria Sol" })).toBe(
      "Oi! Vi a vinheta no site e quero um vídeo como esse para Padaria Sol.",
    );
  });

  it("formata o tempo do teste de velocidade com vírgula", () => {
    expect(mensagemWhatsApp({ tipo: "velocidade", segundos: 3.456 })).toBe(
      "Oi! Testei meu site na vito.dev e ele abriu em 3,5 s. O que dá para melhorar?",
    );
  });

  it("usa um nome neutro quando o negócio vem vazio", () => {
    expect(mensagemWhatsApp({ tipo: "previa", negocio: "   " })).toBe(
      "Oi! Montei uma prévia para o meu negócio no site. Podemos conversar?",
    );
  });
});

describe("limparNomeNegocio", () => {
  it("tira espaços extras e corta em 32 caracteres", () => {
    expect(limparNomeNegocio("  Padaria   Sol  ")).toBe("Padaria Sol");
    expect(limparNomeNegocio("a".repeat(40))).toHaveLength(32);
  });

  it("remove quebras de linha e caracteres de controle", () => {
    expect(limparNomeNegocio("Bar\ndo\tZé\u0000")).toBe("Bar do Zé");
  });

  it("não corta um emoji pela metade", () => {
    const nome = "x".repeat(31) + "😀";
    expect(limparNomeNegocio(nome)).toBe(nome);
    expect([...limparNomeNegocio("x".repeat(32) + "😀")]).toHaveLength(32);
  });
});

describe("linkWhatsApp", () => {
  it("monta o link oficial com o texto codificado", () => {
    expect(linkWhatsApp({ tipo: "geral" })).toBe(
      base +
        encodeURIComponent("Oi! Vim pelo site e quero saber mais sobre os serviços da vito.dev."),
    );
  });

  it("usa https e o número oficial", () => {
    const url = new URL(linkWhatsApp({ tipo: "plano", plano: "inicial" }));
    expect(url.protocol).toBe("https:");
    expect(url.host).toBe("wa.me");
    expect(url.pathname).toBe("/5521959020656");
    expect(url.searchParams.get("text")).toContain("Pacote Inicial");
  });
});
