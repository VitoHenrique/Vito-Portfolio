"use client";

import { useRef, useState } from "react";
import { ListaMarcada } from "@/componentes/Marcador";
import { contatos, marca } from "@/conteudo/site";

/**
 * "Tudo no lugar": o mesmo sistema aplicado em perfil, capa do WhatsApp,
 * cartão (com giro em CSS 3D), proposta e favicon. Clicar troca a peça com
 * Flip (o plugin só carrega no primeiro clique).
 * O verso do cartão é montado aqui com o @ certo (@vitodev.oficial): o
 * arquivo do pacote ainda tinha o @ provisório e ficou de fora.
 */
const pecas = [
  { id: "perfil", nome: "Perfil", img: "instagram-perfil", w: 900, h: 900 },
  { id: "whatsapp", nome: "Capa do WhatsApp", img: "whatsapp-capa", w: 900, h: 506 },
  { id: "cartao", nome: "Cartão", img: "cartao-frente", w: 900, h: 500 },
  { id: "proposta", nome: "Proposta", img: "proposta-capa", w: 848, h: 1200 },
  { id: "favicon", nome: "Favicon", img: null, w: 0, h: 0 },
] as const;
type Peca = (typeof pecas)[number]["id"];

function Imagem({ nome, alt, w, h }: { nome: string; alt: string; w: number; h: number }) {
  return (
    <picture>
      <source srcSet={`/marca/aplicacoes/${nome}.avif`} type="image/avif" />
      <img src={`/marca/aplicacoes/${nome}.webp`} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="block h-auto max-h-[460px] w-auto max-w-full rounded-sm" />
    </picture>
  );
}

function VersoCartao() {
  return (
    <div className="flex aspect-[9/5] w-full flex-col justify-between rounded-sm bg-grafite p-[6%]">
      <div>
        <p className="text-[clamp(14px,2.4vw,22px)] font-extrabold tracking-[-0.02em]">Vito</p>
        <p className="corpo-pequeno text-cinza-oliva">Sites, sistemas, identidade visual e vídeos</p>
      </div>
      <ListaMarcada className="numero !text-[clamp(10px,1.4vw,13px)]" itens={[contatos.whatsappExibicao, contatos.instagram, "vito-dev.vercel.app"]} />
      <p className="text-[clamp(12px,1.8vw,16px)]">
        <span className="font-extrabold">Seu site no ar.</span> <span className="font-light">Ponto</span>
        <span className="text-verde-lima">.</span>
      </p>
    </div>
  );
}

export function Aplicacoes() {
  const [ativa, setAtiva] = useState<Peca>("perfil");
  const [verso, setVerso] = useState(false);
  const palco = useRef<HTMLDivElement>(null);

  const trocar = async (id: Peca) => {
    if (id === ativa) return;
    const el = palco.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAtiva(id);
      return;
    }
    const [{ carregar }, { gsap }] = await Promise.all([import("@/motion/plugins"), import("@/motion/gsap")]);
    const Flip = await carregar.Flip();
    const estado = Flip.getState(el);
    setAtiva(id);
    setVerso(false);
    requestAnimationFrame(() => {
      Flip.from(estado, { duration: 0.5, ease: "entrada", absolute: false });
      gsap.fromTo(el.firstElementChild, { yPercent: 4 }, { yPercent: 0, duration: 0.5, ease: "entrada" });
    });
  };

  const p = pecas.find((x) => x.id === ativa)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Aplicações da marca">
        {pecas.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={ativa === x.id}
            onClick={() => trocar(x.id)}
            className={`corpo-pequeno min-h-11 rounded-pill border px-4 ${ativa === x.id ? "border-giz text-giz" : "border-linha text-cinza-oliva"}`}
          >
            {x.nome}
          </button>
        ))}
      </div>
      <div ref={palco} role="tabpanel" className="flex min-h-[320px] items-center justify-center rounded-md border border-linha bg-grafite-claro p-4 md:min-h-[480px] md:p-6">
        <div className="flex w-full flex-col items-center gap-3">
          {p.id === "cartao" ? (
            <>
              <div className="w-full max-w-[520px] [perspective:1200px]">
                <div
                  className="relative transition-transform duration-700 ease-entrada [transform-style:preserve-3d] motion-reduce:transition-none"
                  style={{ transform: verso ? "rotateY(180deg)" : undefined }}
                >
                  <div className="[backface-visibility:hidden]">
                    <Imagem nome="cartao-frente" alt="Cartão de visita, frente: wordmark e o ponto gigante" w={900} h={500} />
                  </div>
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <VersoCartao />
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setVerso((v) => !v)} className="corpo-pequeno min-h-11 rounded-pill border border-linha px-4 text-cinza-oliva hover:text-giz">
                Virar o cartão
              </button>
            </>
          ) : p.id === "favicon" ? (
            <div className="flex items-end gap-5">
              {[16, 32, 64, 128].map((t) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={t} src="/icon.svg" alt="" width={t} height={t} className="rounded-[18%]" />
              ))}
              <span className="sr-only">Favicon da vito.dev em 16, 32, 64 e 128 pixels, sobre o quadrado Grafite</span>
            </div>
          ) : (
            <Imagem nome={p.img!} alt={`${p.nome} da vito.dev`} w={p.w} h={p.h} />
          )}
        </div>
      </div>
      <p className="corpo-pequeno text-cinza-oliva">Peças reais da identidade da {marca.nome}: o mesmo sistema em todo lugar.</p>
    </div>
  );
}
