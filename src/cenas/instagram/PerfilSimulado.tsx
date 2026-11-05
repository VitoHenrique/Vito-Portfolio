"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dados from "@/conteudo/instagram.json";
import { IconeInstagram } from "@/componentes/LinkInstagram";

/**
 * Cena 7 · um perfil de verdade no celular. Conteúdo real do
 * @vitodev.oficial (sincronizado por `npm run sync:ig`). A interface é da
 * vito.dev: lembra um app de rede social, mas sem logo nem ícones do
 * Instagram. Sem curtida, comentário ou seguidor: só números reais.
 * A garantia nunca entra aqui (o sync recusa).
 */
type Post = (typeof dados.posts)[number];
type Destaque = (typeof dados.destaques)[number];

const estilos: Record<string, { nome: string; regra: string }> = {
  tipografico: { nome: "Linha de lançamento · tipográfica", regra: "Fixada no topo. É a única linha tipográfica do perfil." },
  cartao: { nome: "Semana · cartão", regra: "Conteúdo dentro de um cartão Grafite Claro." },
  ponto: { nome: "Semana · ponto", regra: "O ponto Verde Lima no canto superior direito." },
  verde: { nome: "Semana · verde", regra: "Fundo Verde Lima, texto Grafite, rodapé só com o @." },
};

function Imagem({ base, alt, className = "", prioridade = false }: { base: string; alt: string; className?: string; prioridade?: boolean }) {
  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <img src={`${base}.webp`} alt={alt} loading={prioridade ? "eager" : "lazy"} decoding="async" className={className} />
    </picture>
  );
}

const reduzido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const DURACAO_STORY = 5000;

/* ───── Story ───── */
function Story({ destaque, fechar }: { destaque: Destaque; fechar: () => void }) {
  const [i, setI] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const total = destaque.stories.length;
  const avancar = useCallback(() => (i + 1 < total ? (setI(i + 1), setProgresso(0)) : fechar()), [i, total, fechar]);
  const voltar = () => (i > 0 ? (setI(i - 1), setProgresso(0)) : setProgresso(0));

  useEffect(() => {
    if (reduzido()) return; // sem avanço automático: o visitante toca para seguir
    const inicio = performance.now() - progresso * DURACAO_STORY;
    let q = 0;
    const passo = (t: number) => {
      const p = (t - inicio) / DURACAO_STORY;
      if (p >= 1) return avancar();
      setProgresso(p);
      q = requestAnimationFrame(passo);
    };
    q = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") avancar();
      if (e.key === "ArrowLeft") voltar();
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  return (
    <div role="dialog" aria-modal="true" aria-label={`Destaque ${destaque.nome}, story ${i + 1} de ${total}`} className="fixed inset-0 z-50 flex flex-col bg-grafite md:absolute md:rounded-[34px]">
      <div className="flex gap-1 px-3 pt-[max(12px,env(safe-area-inset-top))] md:pt-5">
        {destaque.stories.map((_, k) => (
          <span key={k} className="h-0.5 flex-1 overflow-hidden rounded-pill bg-linha">
            <span className="block h-full origin-left bg-giz" style={{ transform: `scaleX(${k < i ? 1 : k === i ? progresso : 0})` }} />
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="corpo-pequeno font-semibold">{destaque.nome}</span>
        <button type="button" onClick={fechar} className="corpo-pequeno min-h-11 px-2 text-cinza-oliva" aria-label="Fechar story">
          Fechar
        </button>
      </div>
      <div className="relative flex-1">
        <Imagem base={destaque.stories[i]!} alt={`Story ${i + 1} do destaque ${destaque.nome}`} className="absolute inset-0 h-full w-full object-contain" prioridade />
        <button type="button" onClick={voltar} className="absolute inset-y-0 left-0 w-1/3" aria-label="Story anterior" />
        <button type="button" onClick={avancar} className="absolute inset-y-0 right-0 w-2/3" aria-label="Próximo story" />
      </div>
    </div>
  );
}

/* ───── Post em tela cheia ───── */
function PostAberto({ post, fechar }: { post: Post; fechar: () => void }) {
  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [mais, setMais] = useState(false);
  const total = post.slides.length;

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [fechar]);

  const ir = (k: number) => {
    const el = trilho.current;
    if (!el) return;
    el.scrollTo({ left: k * el.clientWidth, behavior: reduzido() ? "auto" : "smooth" });
  };
  const [primeira, ...resto] = post.legenda.split("\n");

  return (
    <div role="dialog" aria-modal="true" aria-label="Post do @vitodev.oficial" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-grafite md:absolute md:rounded-[34px]">
      <div className="flex items-center justify-between px-3 pb-2 pt-[max(12px,env(safe-area-inset-top))] md:pt-4">
        <span className="corpo-pequeno font-semibold">vitodev.oficial</span>
        <button type="button" onClick={fechar} className="corpo-pequeno min-h-11 px-2 text-cinza-oliva">
          Fechar
        </button>
      </div>
      <div
        ref={trilho}
        onScroll={(e) => setAtual(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex shrink-0 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
        aria-roledescription="carrossel"
      >
        {post.slides.map((s, k) => (
          <div key={s} className="w-full shrink-0 snap-center" aria-label={`Slide ${k + 1} de ${total}`}>
            <Imagem base={s} alt={`Slide ${k + 1} de ${total}`} className="aspect-[4/5] w-full object-cover" prioridade={k === 0} />
          </div>
        ))}
      </div>
      {total > 1 && (
        <div className="flex items-center justify-center gap-3 py-2">
          <button type="button" onClick={() => ir(Math.max(0, atual - 1))} className="corpo-pequeno min-h-11 px-3 text-cinza-oliva" aria-label="Slide anterior">
            Anterior
          </button>
          <span className="numero !text-[12px] text-cinza-oliva" aria-live="polite">
            {atual + 1}/{total}
          </span>
          <button type="button" onClick={() => ir(Math.min(total - 1, atual + 1))} className="corpo-pequeno min-h-11 px-3 text-cinza-oliva" aria-label="Próximo slide">
            Próximo
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2 px-3 pb-6">
        <p className="corpo-pequeno">
          <span className="font-semibold">vitodev.oficial</span> {primeira}
          {!mais && resto.length > 0 && (
            <button type="button" onClick={() => setMais(true)} className="ml-1 text-cinza-oliva">
              mais
            </button>
          )}
        </p>
        {mais && <p className="corpo-pequeno whitespace-pre-line text-cinza-oliva">{resto.join("\n").trim()}</p>}
        <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="corpo-pequeno inline-flex min-h-11 items-center gap-2 py-3 text-giz underline-offset-4 hover:underline">
          <IconeInstagram />
          Ver o post original no Instagram
        </a>
      </div>
    </div>
  );
}

/* ───── Perfil ───── */
export function PerfilSimulado() {
  const [aba, setAba] = useState<"posts" | "reels">("posts");
  const [story, setStory] = useState<Destaque | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  // Este componente só roda no navegador (ssr: false), então a hora é a do visitante.
  const [agora] = useState(() => Date.now());

  // Grade: a linha fixada no topo, depois o resto do mais novo para o mais antigo.
  const grade = useMemo(() => {
    const fixados = dados.linhaFixada.map((id) => dados.posts.find((p) => p.id === id)!).filter(Boolean);
    const outros = dados.posts.filter((p) => !dados.linhaFixada.includes(p.id)).sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
    const linhas: Post[][] = [fixados];
    for (let k = 0; k < outros.length; k += 3) linhas.push(outros.slice(k, k + 3));
    return linhas.filter((l) => l.length);
  }, []);
  const reels = dados.reels.filter((r) => new Date(r.quando).getTime() <= agora);
  const fechar = useCallback(() => {
    setStory(null);
    setPost(null);
  }, []);

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto pt-6 [scrollbar-width:none]">
      <div className="flex items-center gap-4 px-4">
        <Imagem base="/marca/aplicacoes/instagram-perfil" alt="Foto de perfil: o símbolo da vito.dev" className="size-16 shrink-0 rounded-pill object-cover" prioridade />
        <div className="flex flex-col">
          <span className="corpo-pequeno font-semibold">vitodev.oficial</span>
          <span className="numero !text-[12px] text-cinza-oliva">{dados.posts.length} publicações</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-4 pt-3">
        <span className="text-sm font-semibold">vito.dev</span>
        {/* Bio: descrição oficial do WhatsApp Business (a bio do perfil não está no repositório). */}
        <p className="text-[13px] leading-snug text-cinza-oliva">
          Sites, sistemas sob medida, identidade visual e vídeos para pequenos e médios negócios. Atendimento 100% online.
        </p>
        <p className="text-[13px]">
          <span className="font-extrabold">Seu site no ar.</span> <span className="font-light">Ponto</span>
          <span className="text-verde-lima">.</span>
        </p>
        <a href={dados.perfil.link} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-sm border border-linha py-2 text-[13px] font-semibold">
          <IconeInstagram className="size-3.5" />
          Ver no Instagram
        </a>
      </div>

      <ul className="flex gap-3 overflow-x-auto px-4 py-4 [scrollbar-width:none]" aria-label="Destaques">
        {dados.destaques.map((d) => (
          <li key={d.id} className="shrink-0">
            <button type="button" onClick={() => setStory(d)} className="flex w-16 flex-col items-center gap-1" aria-label={`Abrir destaque ${d.nome}`}>
              <span className="block size-16 overflow-hidden rounded-pill border border-linha p-0.5">
                <Imagem base={d.capa} alt="" className="size-full rounded-pill object-cover" />
              </span>
              <span className="text-[11px] text-cinza-oliva">{d.nome}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 border-y border-linha" role="tablist" aria-label="Conteúdo do perfil">
        {(["posts", "reels"] as const).map((a) => (
          <button key={a} role="tab" aria-selected={aba === a} onClick={() => setAba(a)} className={`min-h-11 text-[13px] ${aba === a ? "border-b-2 border-giz text-giz" : "text-cinza-oliva"}`}>
            {a === "posts" ? "Posts" : "Reels"}
          </button>
        ))}
      </div>

      {aba === "posts" ? (
        <div className="flex flex-col gap-px pb-6" role="tabpanel">
          {grade.map((linha, k) => {
            const estilo = estilos[linha[0]!.estilo] ?? estilos.cartao!;
            return (
              <div key={k} className="group relative">
                <ul className="grid grid-cols-3 gap-px">
                  {linha.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => setPost(p)} className="block w-full" aria-label={`Abrir post: ${p.legenda.split("\n")[0]}`}>
                        <Imagem base={p.slides[0]!} alt="" className="aspect-[4/5] w-full object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full bg-grafite-claro px-3 py-2 group-hover:block md:group-hover:block" aria-hidden>
                  <p className="rotulo !text-[10px] text-verde-lima">{estilo.nome}</p>
                  <p className="text-[12px] text-cinza-oliva">{estilo.regra}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4" role="tabpanel">
          {reels.length ? (
            reels.map((r) => (
              <video key={r.id} src={r.video} poster="/video/3-logos-1-empresa-capa.avif" controls muted playsInline preload="none" className="aspect-[9/16] w-full rounded-sm bg-grafite-claro">
                <track kind="captions" src="/video/3-logos-1-empresa.pt-BR.vtt" srcLang="pt-BR" label="Português" />
              </video>
            ))
          ) : (
            <p className="corpo-pequeno py-8 text-center text-cinza-oliva">O primeiro reel estreia em 06/11.</p>
          )}
        </div>
      )}
      </div>

      {story && <Story destaque={story} fechar={fechar} />}
      {post && <PostAberto post={post} fechar={fechar} />}
    </div>
  );
}
