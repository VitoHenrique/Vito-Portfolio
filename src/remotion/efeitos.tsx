import type { ComponentType } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { formatarReais, plano } from "@/conteudo/precos";
import { DuasVozes, Mascara, Palco, PontoGigante, RotuloVideo, WordmarkAnimado } from "./pecas";
import { cor, curva, entrar, f, fonte, preso, sair } from "./tema";

/**
 * Mesa de efeitos: composições reais do Remotion, desenhadas no navegador.
 * Todas em 1080 × 1080, 30 fps, em loop. Textos com fatos verdadeiros da
 * vito.dev; o gráfico usa dados de exemplo e diz isso na tela.
 */

function TextoCinetico() {
  const frame = useCurrentFrame();
  const palavras = ["Seu", "cliente", "passa", "rápido."];
  const saida = sair(frame, 78);
  return (
    <Palco style={{ justifyContent: "center", padding: 110 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "0.26em",
          fontSize: 150,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          translate: `0 ${-saida * 60}px`,
          opacity: 1 - saida,
        }}
      >
        {palavras.map((p, i) => {
          const inicio = 6 + i * 5;
          const ancora = i === 3;
          return (
            <Mascara key={p} inicio={inicio}>
              <span style={{ color: ancora && frame >= inicio + 6 ? cor.lima : cor.giz }}>{p}</span>
            </Mascara>
          );
        })}
      </div>
    </Palco>
  );
}

function Carimbo() {
  return (
    <Palco style={{ justifyContent: "center", alignItems: "center" }}>
      <WordmarkAnimado inicio={8} largura={760} />
    </Palco>
  );
}

function Contador() {
  const frame = useCurrentFrame();
  const inicial = plano("inicial");
  const alvo = inicial.mensalidade ?? 0;
  const valor = interpolate(frame, [14, 50], [0, alvo], { ...preso, easing: curva.entrada });
  const rotulo = entrar(frame, 4);
  return (
    <Palco style={{ justifyContent: "center", padding: 110, gap: 28 }}>
      <RotuloVideo tamanho={34} style={{ opacity: rotulo, translate: `0 ${(1 - rotulo) * 20}px` }}>
        Site a partir de
      </RotuloVideo>
      <div style={{ fontFamily: fonte.mono, fontSize: 150, color: cor.lima, fontVariantNumeric: "tabular-nums" }}>
        {formatarReais(valor)}
      </div>
      <Mascara inicio={52} style={{ fontSize: 56, fontWeight: 300 }}>
        por mês, com hospedagem.
      </Mascara>
    </Palco>
  );
}

function MarcaTexto() {
  const frame = useCurrentFrame();
  const varre = interpolate(frame, [30, 46], [0, 1], { ...preso, easing: curva.entrada });
  return (
    <Palco style={{ justifyContent: "center", padding: 110 }}>
      <div style={{ fontSize: 128, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
        <Mascara inicio={6} style={{ fontWeight: 800 }}>
          Sua marca,
        </Mascara>
        <br />
        <span style={{ position: "relative", display: "inline-block", fontWeight: 300 }}>
          <span
            style={{
              position: "absolute",
              inset: "0.1em -0.08em 0.02em",
              background: cor.lima,
              borderRadius: 16,
              scale: `${varre} 1`,
              transformOrigin: "left center",
            }}
          />
          <Mascara inicio={12} style={{ position: "relative" }}>
            <span style={{ color: varre > 0.5 ? cor.grafite : cor.giz }}>do jeito certo</span>
          </Mascara>
        </span>
      </div>
    </Palco>
  );
}

/** Texto da narração do reel "3 logos, 1 empresa", com o tempo de cada página. */
const paginasLegenda = [
  { de: 0, ate: 30, palavras: ["Seu", "logo", "tem", "três"] },
  { de: 30, ate: 75, palavras: ["versões", "diferentes."] },
  { de: 75, ate: 120, palavras: ["O", "cliente", "percebe."] },
];

function LegendaReels() {
  const frame = useCurrentFrame();
  const pagina = paginasLegenda.find((p) => frame >= p.de && frame < p.ate) ?? paginasLegenda[0]!;
  const passo = (pagina.ate - pagina.de) / pagina.palavras.length;
  const entra = entrar(frame, pagina.de, 6);
  return (
    <Palco style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 200 }}>
      <RotuloVideo style={{ position: "absolute", top: 90, left: 90 }}>Legenda pronta para o Reels</RotuloVideo>
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          textAlign: "center",
          maxWidth: 880,
          scale: String(0.94 + entra * 0.06),
          translate: `0 ${(1 - entra) * 24}px`,
        }}
      >
        {pagina.palavras.map((p, i) => {
          const ativa = frame >= pagina.de + i * passo && frame < pagina.de + (i + 1) * passo;
          return (
            <span key={p} style={{ color: ativa ? cor.lima : cor.giz }}>
              {p}{" "}
            </span>
          );
        })}
      </div>
    </Palco>
  );
}

function Grafico() {
  const frame = useCurrentFrame();
  const barras = [0.38, 0.52, 0.47, 0.86];
  return (
    <Palco style={{ padding: 110, justifyContent: "space-between" }}>
      <div>
        <RotuloVideo>Dados de exemplo</RotuloVideo>
        <div style={{ marginTop: 20 }}>
          <DuasVozes pesada="Contatos" leve="por mês" tamanho={92} inicio={4} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 520, borderBottom: `3px solid ${cor.linha}` }}>
        {barras.map((v, i) => {
          const p = entrar(frame, 22 + i * f.cascata * 2, 24);
          const destaque = i === barras.length - 1;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v * 100}%`,
                background: destaque ? cor.lima : cor.linha,
                borderRadius: "16px 16px 0 0",
                scale: `1 ${p}`,
                transformOrigin: "bottom",
              }}
            />
          );
        })}
      </div>
    </Palco>
  );
}

function PontoNaBorda() {
  return (
    <Palco style={{ justifyContent: "flex-end", padding: 110 }}>
      <PontoGigante inicio={4} tamanho={760} />
      <DuasVozes pesada="Seu site no ar." leve="Ponto" tamanho={112} inicio={20} />
    </Palco>
  );
}

export type Efeito = {
  id: string;
  nome: string;
  uso: "Para Reels" | "Para anúncio" | "Para apresentação";
  componente: ComponentType<Record<string, unknown>>;
  duracao: number;
};

export const efeitos: Efeito[] = [
  { id: "texto-cinetico", nome: "Texto cinético", uso: "Para Reels", componente: TextoCinetico, duracao: 96 },
  { id: "carimbo", nome: "Carimbo do logo", uso: "Para Reels", componente: Carimbo, duracao: 60 },
  { id: "contador", nome: "Contador", uso: "Para anúncio", componente: Contador, duracao: 96 },
  { id: "marca-texto", nome: "Marca-texto", uso: "Para anúncio", componente: MarcaTexto, duracao: 90 },
  { id: "legenda", nome: "Legenda estilo Reels", uso: "Para Reels", componente: LegendaReels, duracao: 120 },
  { id: "grafico", nome: "Gráfico animado", uso: "Para apresentação", componente: Grafico, duracao: 90 },
  { id: "ponto", nome: "Ponto na borda", uso: "Para apresentação", componente: PontoNaBorda, duracao: 72 },
];
