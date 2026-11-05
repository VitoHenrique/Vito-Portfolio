"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Só baixa o Remotion quando a cena de vídeos está a menos de ~1 tela.
 * Até lá: 0 KB de Player. O conteúdo sem JS (fallback) fica no lugar.
 */
const SalaInterativa = dynamic(() => import("./SalaInterativa"), { ssr: false });

export function CarregarSala({ fallback }: { fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setPerto(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{perto ? <SalaInterativa /> : fallback}</div>;
}
