import { abertura } from "@/motion/curvas";

/**
 * Roda antes da primeira pintura (inline no <head>). Liga a abertura só na
 * home, na primeira visita da sessão e sem movimento reduzido. Se o motor de
 * animação não assumir em 2,5 s, a página aparece normal. Sem JS, nunca liga.
 */
export const scriptAbertura = `(function(){try{var h=document.documentElement;if(location.pathname!=="/")return;if(!matchMedia("(prefers-reduced-motion: no-preference)").matches)return;if(sessionStorage.getItem("vd-abertura"))return;h.classList.add("abertura");setTimeout(function(){if(!h.dataset.motor)h.classList.remove("abertura")},${abertura.limiteMs})}catch(e){}})();`;
