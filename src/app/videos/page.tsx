import type { Metadata } from "next";
import { Moldura } from "@/componentes/Moldura";
import { OutrosServicos } from "@/componentes/OutrosServicos";
import { HeroiServico } from "@/cenas/heroi/HeroiServico";
import { Videos } from "@/cenas/videos/Videos";
import { Fecho } from "@/cenas/fecho/Fecho";
import { AnimacaoVideos } from "@/motion/Motor";

/** O rótulo do reel muda sozinho no dia da estreia (06/11) sem novo deploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vídeos e animações",
  description:
    "Vídeos curtos e animações para Reels, anúncios e apresentações, com a cara da sua marca. Teste os efeitos e monte uma vinheta com o nome do seu negócio.",
  alternates: { canonical: "/videos" },
};

/** Página de vídeos: a sala de cinema, o momento máximo do site. */
export default function PaginaVideos() {
  return (
    <Moldura ilhas={<AnimacaoVideos />}>
      <HeroiServico
        pesada="Vídeos curtos"
        leve="para Reels, anúncios e apresentações"
        texto="Animados em código, com as suas cores e as suas fontes. Aqui você não só assiste: você mexe no vídeo."
        pontos={["Texto que acompanha a fala e legenda pronta", "Formatos 9:16, 1:1 e 16:9", "Prazo e preço combinados antes de começar"]}
        origem="videos-heroi"
        pedido={{ tipo: "geral" }}
        secundario={{ href: "#videos", rotulo: "Entrar na sala" }}
      />
      <Videos cena="02" />
      <Fecho cena="03" perguntas={false} origem="videos-fecho" />
      <OutrosServicos atual="videos" />
    </Moldura>
  );
}
