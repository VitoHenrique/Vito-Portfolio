"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/** O perfil (e as imagens dele) só carrega quando a cena se aproxima. */
const PerfilSimulado = dynamic(() => import("./PerfilSimulado").then((m) => m.PerfilSimulado), { ssr: false });

export function CarregarPerfil() {
  const ref = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e?.isIntersecting && (setPerto(true), obs.disconnect()), { rootMargin: "100% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-full">
      {perto ? (
        <PerfilSimulado />
      ) : (
        <div className="flex h-full items-center justify-center p-6 text-center">
          <p className="corpo-pequeno text-cinza-oliva">O perfil @vitodev.oficial aparece aqui.</p>
        </div>
      )}
    </div>
  );
}
