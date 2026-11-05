import { useCurrentFrame } from "remotion";
import { Mascara, Palco, PontoGigante, RotuloVideo } from "./pecas";
import { carimbo, cor, sair } from "./tema";

export type Formato = "9:16" | "1:1" | "16:9";

export const tamanhos: Record<Formato, { w: number; h: number }> = {
  "9:16": { w: 1080, h: 1920 },
  "1:1": { w: 1080, h: 1080 },
  "16:9": { w: 1920, h: 1080 },
};

export const DURACAO_VINHETA = 150; // 5 s

export type PropsVinheta = {
  /** Nome do negócio, já limpo (até 32 caracteres). */
  nome: string;
  /** A cor do visitante vale só aqui dentro: o Ponto e o ponto final. */
  corMarca: string;
  formato: Formato;
};

/** Corpo do título que cabe na largura, pela quantidade de caracteres. */
function tamanhoQueCabe(texto: string, largura: number, maximo: number) {
  const larguraMediaDoCaractere = 0.56; // Epilogue 800, em em
  return Math.min(maximo, largura / Math.max(4, texto.length * larguraMediaDoCaractere));
}

/**
 * "Sua marca em movimento": a vinheta que muda na hora via inputProps.
 * O Ponto na cor do visitante entra pela borda; o nome entra pesado e a
 * linha leve responde; o ponto final carimba na mesma cor.
 */
export function Vinheta({ nome, corMarca, formato }: PropsVinheta) {
  const frame = useCurrentFrame();
  const { w, h } = tamanhos[formato];
  const vertical = formato === "9:16";
  const margem = Math.round(Math.min(w, h) * 0.09);
  const texto = nome || "Seu negócio";
  const corpo = tamanhoQueCabe(texto, w - margem * 2, vertical ? 150 : formato === "1:1" ? 130 : 150);
  const ponto = carimbo(frame, 40);
  const fim = sair(frame, DURACAO_VINHETA - 14, 12);

  return (
    <Palco style={{ justifyContent: vertical ? "center" : "flex-end", padding: margem }}>
      <PontoGigante inicio={2} tamanho={Math.min(w, h) * (vertical ? 0.95 : 0.78)} corPonto={corMarca} />
      <div style={{ translate: `0 ${-fim * 40}px`, opacity: 1 - fim, display: "flex", flexDirection: "column", gap: corpo * 0.25 }}>
        <div style={{ fontSize: corpo, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", overflowWrap: "anywhere" }}>
          <Mascara inicio={22}>{texto}</Mascara>
        </div>
        <div style={{ fontSize: corpo * 0.62, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em" }}>
          <Mascara inicio={30}>em movimento</Mascara>
          <span style={{ display: "inline-block", color: corMarca, scale: String(ponto) }}>.</span>
        </div>
        <RotuloVideo tamanho={Math.max(20, corpo * 0.18)} style={{ marginTop: corpo * 0.3, opacity: frame > 70 ? 1 : 0 }}>
          Vinheta de exemplo · vito.dev
        </RotuloVideo>
      </div>
    </Palco>
  );
}

export const coresSugeridas = [
  { nome: "Verde Lima", valor: cor.lima },
  { nome: "Azul", valor: "#3d7cf2" },
  { nome: "Laranja", valor: "#f28c28" },
  { nome: "Rosa", valor: "#e8508f" },
  { nome: "Amarelo", valor: "#f2c230" },
  { nome: "Giz", valor: cor.giz },
] as const;
