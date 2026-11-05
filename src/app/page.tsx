import { Cabecalho } from "@/componentes/Cabecalho";
import { Rodape } from "@/componentes/Rodape";
import { WhatsAppFlutuante } from "@/componentes/WhatsAppFlutuante";
import { Atalhos } from "@/componentes/Atalhos";
import { Heroi } from "@/cenas/heroi/Heroi";
import { Corrida } from "@/cenas/corrida/Corrida";
import { Oficios } from "@/cenas/oficios/Oficios";
import { Sites } from "@/cenas/sites/Sites";
import { Sistemas } from "@/cenas/sistemas/Sistemas";
import { Identidade } from "@/cenas/identidade/Identidade";
import { Instagram } from "@/cenas/instagram/Instagram";
import { Videos } from "@/cenas/videos/Videos";
import { Planos } from "@/cenas/planos/Planos";
import { Processo } from "@/cenas/processo/Processo";
import { Fecho } from "@/cenas/fecho/Fecho";
import { Abertura, AnimacaoCenas, AnimacaoSistemas, AnimacaoVideos, Filme, Ponto } from "@/motion/Motor";

/** O rótulo do reel muda sozinho no dia da estreia (06/11) sem novo deploy. */
export const revalidate = 3600;

/**
 * Home: um filme em plano-sequência de 12 cenas (0 a 11), com o Ponto como
 * único ator. Cada cena tem o conteúdo no HTML do servidor e uma ilha de
 * animação que chega depois. Casos reais entram entre Vídeos e Planos quando
 * houver projetos autorizados (casos.ts vazio: a cena não aparece).
 */
export default function Home() {
  return (
    <>
      <Ponto />
      <Filme />
      <Abertura />
      <AnimacaoCenas />
      <AnimacaoSistemas />
      <AnimacaoVideos />
      <Atalhos />
      <Cabecalho />
      <main id="conteudo" className="relative z-10">
        <Heroi />
        <Corrida />
        <Oficios />
        <Sites />
        <Sistemas />
        <Identidade />
        <Instagram />
        <Videos />
        <Planos />
        <Processo />
        <Fecho />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
    </>
  );
}
