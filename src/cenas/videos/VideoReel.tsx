"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  legendas: string;
  titulo: string;
};

/**
 * Vídeo nativo (MP4 H.264), sem som por padrão e sem baixar nada antes de
 * aparecer (preload="none"). Toca mudo quando entra na tela, pausa quando
 * sai. Com movimento reduzido, só toca com clique. Legenda .vtt disponível
 * nos controles (o reel já traz a legenda gravada na imagem).
 */
export function VideoReel({ src, poster, legendas, titulo }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting && !reduzido) video.play().catch(() => {});
        if (!e.isIntersecting) video.pause();
      },
      { threshold: 0.5 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  const alternarSom = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMudo(video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        preload="none"
        muted
        playsInline
        controls
        aria-label={titulo}
        data-evento="video_play"
        onVolumeChange={(e) => setMudo(e.currentTarget.muted)}
      >
        <track kind="captions" src={legendas} srcLang="pt-BR" label="Português" />
      </video>
      <button
        type="button"
        onClick={alternarSom}
        aria-pressed={!mudo}
        className="rotulo absolute right-3 top-12 z-10 min-h-11 rounded-pill bg-grafite px-4 text-giz"
      >
        Som: {mudo ? "ligar" : "desligar"}
      </button>
    </div>
  );
}
