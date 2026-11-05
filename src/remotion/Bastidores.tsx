import { useCurrentFrame } from "remotion";
import { DuasVozes, Mascara, Palco, PontoGigante, RotuloVideo, WordmarkAnimado } from "./pecas";
import { cor, sair } from "./tema";

/**
 * Linha do tempo aberta: uma peça curta montada em camadas, com o mesmo
 * roteiro do rascunho do showreel. As camadas abaixo alimentam a régua do
 * site e a própria composição: o que acende na régua é o que está na tela.
 * Esta demonstração não tem som; as camadas de narração e música mostram
 * onde elas entram numa peça de verdade.
 */
export const DURACAO_BASTIDORES = 240; // 8 s a 30 fps

export type Trecho = { de: number; ate: number; rotulo: string };
export type Camada = { id: string; nome: string; trechos: Trecho[] };

const falas: Trecho[] = [
  { de: 6, ate: 66, rotulo: "Seu cliente passa rápido." },
  { de: 84, ate: 156, rotulo: "Seu vídeo precisa ser mais rápido." },
  { de: 176, ate: 228, rotulo: "Quer o seu? Me chama no WhatsApp." },
];

export const camadas: Camada[] = [
  {
    id: "cena",
    nome: "Cena",
    trechos: [
      { de: 0, ate: 78, rotulo: "Abertura" },
      { de: 78, ate: 168, rotulo: "O Ponto" },
      { de: 168, ate: 240, rotulo: "Fecho" },
    ],
  },
  { id: "narracao", nome: "Narração", trechos: falas },
  { id: "musica", nome: "Música", trechos: [{ de: 0, ate: 232, rotulo: "Trilha com ducking na fala" }] },
  {
    id: "efeitos",
    nome: "Efeitos",
    trechos: [
      { de: 0, ate: 18, rotulo: "Texto cinético" },
      { de: 78, ate: 100, rotulo: "Ponto entra da borda" },
      { de: 168, ate: 190, rotulo: "Carimbo do logo" },
    ],
  },
  { id: "legenda", nome: "Legenda", trechos: falas.map((t) => ({ ...t, rotulo: "na tela, junto com a fala" })) },
];

export const ativo = (camada: Camada, frame: number) =>
  camada.trechos.find((t) => frame >= t.de && frame < t.ate) ?? null;

export function Bastidores() {
  const frame = useCurrentFrame();
  const fala = falas.find((t) => frame >= t.de && frame < t.ate);
  return (
    <Palco style={{ padding: 120, justifyContent: "center" }}>
      {frame < 78 && (
        <div style={{ opacity: 1 - sair(frame, 68) }}>
          <DuasVozes pesada="Seu cliente" leve="passa rápido" tamanho={150} inicio={4} />
        </div>
      )}
      {frame >= 78 && frame < 168 && (
        <>
          <PontoGigante inicio={80} tamanho={860} />
          <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: "-0.03em", maxWidth: 1000, lineHeight: 1, opacity: 1 - sair(frame, 158) }}>
            <Mascara inicio={86}>Seu vídeo precisa</Mascara>
            <br />
            <Mascara inicio={92} style={{ fontWeight: 300 }}>
              ser mais rápido
            </Mascara>
          </div>
        </>
      )}
      {frame >= 168 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
          <WordmarkAnimado inicio={170} largura={900} />
          <DuasVozes pesada="Seu site no ar." leve="Ponto" tamanho={84} inicio={188} />
        </div>
      )}
      {fala && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 70,
            textAlign: "center",
            fontSize: 44,
            fontWeight: 600,
            color: cor.giz,
          }}
        >
          {fala.rotulo}
        </div>
      )}
      <RotuloVideo tamanho={24} style={{ position: "absolute", top: 50, right: 60 }}>
        Sem som nesta demonstração
      </RotuloVideo>
    </Palco>
  );
}
