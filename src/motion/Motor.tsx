"use client";

import dynamic from "next/dynamic";

/**
 * O motor de animação fica fora do JavaScript crítico.
 *
 * O HTML de cada cena chega pronto do servidor e o React hidrata sem o GSAP.
 * Logo depois, estes módulos carregam em paralelo e assumem a cena. Assim o
 * JavaScript que bloqueia a abertura fica em ~125 KB (React + Next), dentro
 * da meta de 170 KB, e o H1 aparece no primeiro quadro.
 *
 * Toda ilha de animação de cena segue o mesmo padrão: dynamic com ssr: false.
 * (O Next exige o objeto de opções escrito ali mesmo, sem variável.)
 */
export const Ponto = dynamic(() => import("./Ponto").then((m) => m.Ponto), { ssr: false });
export const Filme = dynamic(() => import("./Filme").then((m) => m.Filme), { ssr: false });
export const Rolagem = dynamic(() => import("./Rolagem").then((m) => m.Rolagem), { ssr: false });

/** Ilhas de cena da home. */
export const Abertura = dynamic(() => import("@/cenas/abertura/Abertura").then((m) => m.Abertura), { ssr: false });
export const AnimacaoCenas = dynamic(() => import("@/cenas/AnimacaoCenas").then((m) => m.AnimacaoCenas), { ssr: false });
export const AnimacaoSistemas = dynamic(() => import("@/cenas/sistemas/AnimacaoSistemas").then((m) => m.AnimacaoSistemas), {
  ssr: false,
});
export const AnimacaoVideos = dynamic(() => import("@/cenas/videos/AnimacaoVideos").then((m) => m.AnimacaoVideos), {
  ssr: false,
});
