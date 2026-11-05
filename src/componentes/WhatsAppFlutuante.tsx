"use client";

import { useEffect, useState } from "react";
import { linkWhatsApp } from "@/conteudo/whatsapp";
import { classeBotao } from "./Botao";

/**
 * Botão flutuante de WhatsApp: aparece depois que o herói sai da tela,
 * no canto inferior direito, sem cobrir conteúdo (a página reserva o espaço
 * embaixo). Some de novo perto do fim, onde o botão final já está.
 */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const fimHeroi = document.querySelector("[data-heroi-fim]");
    if (!fimHeroi) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e) setVisivel(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    obs.observe(fimHeroi);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href={linkWhatsApp({ tipo: "geral" })}
      target="_blank"
      rel="noopener noreferrer"
      data-evento="whatsapp_click"
      data-origem="flutuante"
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      className={classeBotao(
        "giz",
        // No celular o cabeçalho fixo já tem o WhatsApp: o flutuante cobriria o texto, então não aparece.
        `fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-5 z-40 !hidden !min-h-12 border border-linha md:!inline-flex transition-[opacity,translate] duration-300 ${
          visivel ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`,
      )}
    >
      Chamar no WhatsApp
    </a>
  );
}
