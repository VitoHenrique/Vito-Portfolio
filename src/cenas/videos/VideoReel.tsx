"use client";

import { useEffect, useRef, useState } from "react";
import { Celular } from "@/componentes/Celular";

type Props = {
  src: string;
  poster: string;
  legendas: string;
  titulo: string;
  className?: string;
};

/**
 * O reel no celular. Abre tocando, sem som e em loop (pedido do Vito), e
 * pausa sozinho quando sai da tela. Os controles ficam ABAIXO do celular,
 * como botões de verdade: Pausar/Tocar e Ligar/Tirar o som.
 * Com movimento reduzido, não começa sozinho: espera o "Tocar".
 * Nada baixa antes de aparecer (preload="none").
 */
export function VideoReel({ src, poster, legendas, titulo, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);
  const [tocando, setTocando] = useState(false);
  const pausadoPeloVisitante = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) pausadoPeloVisitante.current = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting && !pausadoPeloVisitante.current) video.play().catch(() => {});
        if (!e.isIntersecting) video.pause();
      },
      { threshold: 0.4 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  const alternarPlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      pausadoPeloVisitante.current = false;
      video.play().catch(() => {});
    } else {
      pausadoPeloVisitante.current = true;
      video.pause();
    }
  };

  const alternarSom = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMudo(video.muted);
    if (!video.muted && video.paused) {
      pausadoPeloVisitante.current = false;
      video.play().catch(() => {});
    }
  };

  const botao = "corpo-pequeno inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-linha bg-grafite-claro px-4 font-semibold text-giz hover:border-giz";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Celular rotulo={titulo} className="w-[260px] md:w-[300px]">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          aria-label={titulo}
          data-evento="video_play"
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onVolumeChange={(e) => setMudo(e.currentTarget.muted)}
        >
          <track kind="captions" src={legendas} srcLang="pt-BR" label="Português" />
        </video>
      </Celular>
      <div className="flex gap-2" role="group" aria-label="Controles do vídeo">
        <button type="button" onClick={alternarPlay} className={botao} aria-pressed={!tocando}>
          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 fill-current">
            {tocando ? <path d="M3 2h3.5v12H3zM9.5 2H13v12H9.5z" /> : <path d="M4 2l10 6-10 6z" />}
          </svg>
          {tocando ? "Pausar" : "Tocar"}
        </button>
        <button type="button" onClick={alternarSom} className={botao} aria-pressed={!mudo}>
          <svg aria-hidden viewBox="0 0 16 16" className="size-4 fill-none stroke-current" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M2 6h3l4-3v10l-4-3H2z" className="fill-current" />
            {mudo ? <path d="M11 6l4 4M15 6l-4 4" strokeLinecap="round" /> : <path d="M11.5 5.5a3.5 3.5 0 0 1 0 5M13.3 3.7a6 6 0 0 1 0 8.6" strokeLinecap="round" />}
          </svg>
          {mudo ? "Ligar som" : "Tirar som"}
        </button>
      </div>
    </div>
  );
}
