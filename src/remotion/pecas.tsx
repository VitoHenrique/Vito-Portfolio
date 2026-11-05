import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { wordmark } from "@/marca/wordmark";
import { carimbo, cor, entrar, fonte } from "./tema";

/** Fundo Grafite de toda composição. */
export function Palco({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <AbsoluteFill style={{ background: cor.grafite, color: cor.giz, fontFamily: fonte.sans, ...style }}>
      {children}
    </AbsoluteFill>
  );
}

/** Entrada por máscara: sobe de dentro de um recorte (padrão Reveal da central). */
export function Mascara({ children, inicio, style }: { children: ReactNode; inicio: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const p = entrar(frame, inicio);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", ...style }}>
      <span style={{ display: "inline-block", translate: `0 ${(1 - p) * 105}%` }}>{children}</span>
    </span>
  );
}

/** Título em duas vozes com o ponto carimbando por último. */
export function DuasVozes({
  pesada,
  leve,
  inicio = 0,
  tamanho,
  corPonto = cor.lima,
}: {
  pesada: string;
  leve: string;
  inicio?: number;
  tamanho: number;
  corPonto?: string;
}) {
  const frame = useCurrentFrame();
  const s = carimbo(frame, inicio + 8);
  return (
    <div style={{ fontSize: tamanho, lineHeight: 1, letterSpacing: "-0.03em" }}>
      <Mascara inicio={inicio} style={{ fontWeight: 800 }}>
        {pesada}
      </Mascara>{" "}
      <Mascara inicio={inicio + 4} style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
        {leve}
      </Mascara>
      <span style={{ display: "inline-block", color: corPonto, scale: String(s) }}>.</span>
    </div>
  );
}

/** O Ponto gigante entrando da borda (um por peça, sem texto em cima). */
export function PontoGigante({
  inicio,
  tamanho,
  canto = "superior-direito",
  corPonto = cor.lima,
}: {
  inicio: number;
  tamanho: number;
  canto?: "superior-direito" | "inferior-direito";
  corPonto?: string;
}) {
  const frame = useCurrentFrame();
  const p = entrar(frame, inicio, 22);
  const deslocamento = (1 - p) * tamanho * 0.6;
  const vertical = canto === "superior-direito" ? { top: -tamanho * 0.32 } : { bottom: -tamanho * 0.32 };
  return (
    <div
      style={{
        position: "absolute",
        right: -tamanho * 0.3,
        ...vertical,
        width: tamanho,
        height: tamanho,
        borderRadius: "50%",
        background: corPonto,
        translate: `${deslocamento}px ${canto === "superior-direito" ? -deslocamento : deslocamento}px`,
      }}
    />
  );
}

/** Wordmark oficial (caminhos do SVG da marca), com carimbo do ponto. */
export function WordmarkAnimado({ inicio, largura }: { inicio: number; largura: number }) {
  const frame = useCurrentFrame();
  const vito = entrar(frame, inicio);
  const dev = entrar(frame, inicio + 4);
  const ponto = carimbo(frame, inicio + 8);
  const [, , w, h] = wordmark.viewBox.split(" ").map(Number);
  return (
    <svg viewBox={wordmark.viewBox} width={largura} height={(largura * h!) / w!} style={{ overflow: "visible" }}>
      <g transform={wordmark.transform}>
        <path d={wordmark.vito} fill={cor.giz} style={{ clipPath: `inset(${(1 - vito) * 100}% 0 0 0)`, translate: `0 ${(1 - vito) * 20}px` }} />
        <path d={wordmark.dev} fill={cor.giz} style={{ clipPath: `inset(${(1 - dev) * 100}% 0 0 0)`, translate: `0 ${(1 - dev) * 20}px` }} />
        <path d={wordmark.ponto} fill={cor.lima} style={{ scale: String(ponto), transformBox: "fill-box", transformOrigin: "center" }} />
      </g>
    </svg>
  );
}

/** Rótulo em Martian Mono caixa-alta. */
export function RotuloVideo({ children, tamanho = 28, style }: { children: ReactNode; tamanho?: number; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: fonte.mono,
        fontSize: tamanho,
        fontWeight: 500,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: cor.oliva,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
