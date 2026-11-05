import { Cabecalho } from "@/componentes/Cabecalho";
import { Rodape } from "@/componentes/Rodape";
import { WhatsAppFlutuante } from "@/componentes/WhatsAppFlutuante";
import { Heroi } from "@/cenas/heroi/Heroi";
import { Videos } from "@/cenas/videos/Videos";
import { Planos } from "@/cenas/planos/Planos";
import { Abertura, AnimacaoVideos, Filme, Ponto } from "@/motion/Motor";

/** O rótulo do reel muda sozinho no dia da estreia (06/11) sem novo deploy. */
export const revalidate = 3600;

/**
 * Home · fatia vertical da Fase 2: cenas 0 (carimbo), 1 (herói) e 8 (vídeos).
 * A cena 9 (planos) entra estática para o atalho e o menu funcionarem.
 * As demais cenas chegam na Fase 3, entre o herói e os vídeos.
 */
export default function Home() {
  return (
    <>
      <Ponto />
      <Filme />
      <Abertura />
      <AnimacaoVideos />
      <Cabecalho />
      <main id="conteudo" className="relative z-10">
        <Heroi />
        <Videos />
        <Planos />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
    </>
  );
}
