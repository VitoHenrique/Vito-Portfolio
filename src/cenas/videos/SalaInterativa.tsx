"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";
import { Player, Thumbnail, type PlayerRef } from "@remotion/player";
import { efeitos, type Efeito } from "@/remotion/efeitos";
import { FPS } from "@/remotion/tema";
import { DURACAO_BASTIDORES, ativo, camadas } from "@/remotion/Bastidores";
import { DURACAO_VINHETA, coresSugeridas, tamanhos, type Formato, type PropsVinheta } from "@/remotion/Vinheta";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { Rotulo } from "@/componentes/Rotulo";
import { LIMITE_NOME, limparNomeNegocio } from "@/conteudo/whatsapp";

/**
 * A parte da sala de cinema que mexe no vídeo. Carrega só quando a cena se
 * aproxima (ver CarregarSala). Tudo é desenhado pelo Remotion no navegador,
 * sem renderizar nada no servidor. Nenhum Player toca fora da tela.
 */

const reduzido = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Pausa o Player quando ele sai da tela (e retoma se estava tocando sozinho). */
function usePausarForaDaTela(alvo: RefObject<HTMLElement | null>, player: RefObject<PlayerRef | null>, tocarAoVer: boolean) {
  useEffect(() => {
    const el = alvo.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const p = player.current;
        if (!e || !p) return;
        if (!e.isIntersecting) p.pause();
        else if (tocarAoVer && !reduzido()) p.play();
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [alvo, player, tocarAoVer]);
}

const carregando = () => (
  <div className="flex h-full w-full items-center justify-center bg-grafite-claro">
    <span className="rotulo text-cinza-oliva">Carregando</span>
  </div>
);

/* ─────────── 2. Mesa de efeitos ─────────── */

function CardEfeito({ efeito, ativo: estaAtivo, ativar }: { efeito: Efeito; ativo: boolean; ativar: (id: string | null) => void }) {
  const props = {
    component: efeito.componente,
    durationInFrames: efeito.duracao,
    compositionWidth: 1080,
    compositionHeight: 1080,
    fps: FPS,
    style: { width: "100%", aspectRatio: "1 / 1" },
  };
  return (
    <li className="snap-center">
      <button
        type="button"
        aria-pressed={estaAtivo}
        aria-label={`${efeito.nome}, ${efeito.uso.toLowerCase()}. ${estaAtivo ? "Tocando" : "Tocar"}`}
        onPointerEnter={(e) => e.pointerType === "mouse" && ativar(efeito.id)}
        onPointerLeave={(e) => e.pointerType === "mouse" && ativar(null)}
        onFocus={() => ativar(efeito.id)}
        onBlur={() => ativar(null)}
        onClick={() => ativar(estaAtivo ? null : efeito.id)}
        className={`group block w-[78vw] max-w-[360px] overflow-hidden rounded-md border bg-grafite-claro text-left md:w-full md:max-w-none ${estaAtivo ? "border-verde-lima" : "border-linha"}`}
      >
        <div className="pointer-events-none">
          {estaAtivo ? (
            <Player {...props} autoPlay loop controls={false} clickToPlay={false} acknowledgeRemotionLicense renderLoading={carregando} />
          ) : (
            <Thumbnail {...props} frameToDisplay={Math.round(efeito.duracao * 0.7)} renderLoading={carregando} />
          )}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-linha px-4 py-3">
          <span className="corpo-pequeno font-semibold text-giz">{efeito.nome}</span>
          <span className="rotulo shrink-0 text-cinza-oliva">{efeito.uso}</span>
        </div>
      </button>
    </li>
  );
}

function MesaEfeitos() {
  const [ativo, setAtivo] = useState<string | null>(null);
  return (
    <div>
      <ul
        className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4"
        aria-label="Efeitos de vídeo"
      >
        {efeitos.map((e) => (
          <CardEfeito key={e.id} efeito={e} ativo={ativo === e.id} ativar={setAtivo} />
        ))}
      </ul>
      <p className="corpo-pequeno mt-2 text-cinza-oliva md:hidden">Deslize para o lado e toque para tocar.</p>
    </div>
  );
}

/* ─────────── 3. Linha do tempo aberta ─────────── */

const segundos = (frame: number) => (frame / FPS).toFixed(1).replace(".", ",");
/** Abre num quadro com o título já na tela, não no quadro 0 (vazio). */
const QUADRO_INICIAL = 40;

function LinhaDoTempo() {
  const player = useRef<PlayerRef>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(QUADRO_INICIAL);
  const [tocando, setTocando] = useState(false);
  const id = useId();

  const componente = useCallback(() => import("@/remotion/Bastidores").then((m) => ({ default: m.Bastidores })), []);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    const naTroca = (e: { detail: { frame: number } }) => setFrame(e.detail.frame);
    const play = () => setTocando(true);
    const pause = () => setTocando(false);
    p.addEventListener("frameupdate", naTroca);
    p.addEventListener("seeked", naTroca);
    p.addEventListener("play", play);
    p.addEventListener("pause", pause);
    p.addEventListener("ended", pause);
    return () => {
      p.removeEventListener("frameupdate", naTroca);
      p.removeEventListener("seeked", naTroca);
      p.removeEventListener("play", play);
      p.removeEventListener("pause", pause);
      p.removeEventListener("ended", pause);
    };
  }, []);
  usePausarForaDaTela(caixa, player, false);

  const acesas = camadas.map((c) => ativo(c, frame));
  const descricao = camadas
    .map((c, i) => (acesas[i] ? `${c.nome}: ${acesas[i]!.rotulo}` : null))
    .filter(Boolean)
    .join("; ");

  return (
    <div ref={caixa} className="grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:gap-5">
      <div className="overflow-hidden rounded-md border border-linha">
        <Player
          ref={player}
          lazyComponent={componente}
          durationInFrames={DURACAO_BASTIDORES}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={FPS}
          initialFrame={QUADRO_INICIAL}
          controls={false}
          clickToPlay={false}
          acknowledgeRemotionLicense
          renderLoading={carregando}
          style={{ width: "100%", aspectRatio: "16 / 9" }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => player.current?.toggle()}
            className="rotulo min-h-11 rounded-pill bg-giz px-5 text-grafite"
            aria-pressed={tocando}
          >
            {tocando ? "Pausar" : "Tocar"}
          </button>
          <span className="numero text-cinza-oliva" aria-hidden>
            {segundos(frame)} s / {segundos(DURACAO_BASTIDORES)} s
          </span>
        </div>
        <label htmlFor={id} className="rotulo text-cinza-oliva">
          Arraste a régua
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={DURACAO_BASTIDORES - 1}
          value={frame}
          onChange={(e) => {
            const f = Number(e.currentTarget.value);
            player.current?.pause();
            player.current?.seekTo(f);
            setFrame(f);
          }}
          aria-valuetext={`${segundos(frame)} segundos. ${descricao}`}
          className="regua w-full"
        />
        <ol className="flex flex-col gap-2" aria-label="Camadas do vídeo">
          {camadas.map((c, i) => (
            <li key={c.id} className="grid grid-cols-[88px_1fr] items-center gap-3">
              <span className={`rotulo ${acesas[i] ? "text-verde-lima" : "text-cinza-oliva"}`}>{c.nome}</span>
              <span className="relative h-7 rounded-sm bg-grafite-claro">
                {c.trechos.map((t) => {
                  const aceso = acesas[i] === t;
                  return (
                    <span
                      key={`${t.de}-${t.rotulo}`}
                      className={`absolute inset-y-1 rounded-sm ${aceso ? "bg-verde-lima" : "bg-linha"}`}
                      style={{ left: `${(t.de / DURACAO_BASTIDORES) * 100}%`, width: `${((t.ate - t.de) / DURACAO_BASTIDORES) * 100}%` }}
                    />
                  );
                })}
                <span
                  aria-hidden
                  className="absolute inset-y-0 w-px bg-giz"
                  style={{ left: `${(frame / DURACAO_BASTIDORES) * 100}%` }}
                />
              </span>
            </li>
          ))}
        </ol>
        <p className="corpo-pequeno min-h-[2.9em] text-cinza-oliva" aria-live="polite">
          {descricao || "Entre uma camada e outra, a tela respira."}
        </p>
      </div>
    </div>
  );
}

/* ─────────── 4. Sua marca em movimento ─────────── */

const formatos: Formato[] = ["9:16", "1:1", "16:9"];
const nomesFormato: Record<Formato, string> = { "9:16": "Reels e stories", "1:1": "Feed", "16:9": "YouTube e apresentação" };

function SuaMarca() {
  const player = useRef<PlayerRef>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const [nome, setNome] = useState("");
  const [corMarca, setCorMarca] = useState<string>(coresSugeridas[1].valor);
  const [formato, setFormato] = useState<Formato>("9:16");
  const idNome = useId();
  const idAjuda = useId();

  const componente = useCallback(() => import("@/remotion/Vinheta").then((m) => ({ default: m.Vinheta })), []);
  const inputProps = useMemo<PropsVinheta>(() => ({ nome: limparNomeNegocio(nome), corMarca, formato }), [nome, corMarca, formato]);
  const { w, h } = tamanhos[formato];
  usePausarForaDaTela(caixa, player, true);

  return (
    <div ref={caixa} className="grid items-start gap-5 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()} data-evento="vinheta_editada">
        <div className="flex flex-col gap-2">
          <label htmlFor={idNome} className="rotulo text-cinza-oliva">
            Nome do seu negócio
          </label>
          <input
            id={idNome}
            type="text"
            inputMode="text"
            autoComplete="organization"
            maxLength={LIMITE_NOME}
            value={nome}
            onChange={(e) => setNome(e.currentTarget.value)}
            placeholder="Ex.: Padaria do Bairro"
            aria-describedby={idAjuda}
            className="corpo min-h-12 rounded-sm border border-linha bg-grafite-claro px-4 text-giz placeholder:text-cinza-oliva"
          />
          <p id={idAjuda} className="corpo-pequeno text-cinza-oliva">
            Até {LIMITE_NOME} caracteres. Fica só na sua tela: não guardo o que você digita.
          </p>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="rotulo mb-2 text-cinza-oliva">Cor da sua marca</legend>
          <div className="flex flex-wrap items-center gap-2">
            {coresSugeridas.map((c) => (
              <label key={c.nome} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="cor-marca"
                  value={c.valor}
                  checked={corMarca === c.valor}
                  onChange={() => setCorMarca(c.valor)}
                  className="peer sr-only"
                />
                <span
                  className="block size-11 rounded-pill border-2 border-linha peer-checked:border-giz peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-verde-lima"
                  style={{ background: c.valor }}
                />
                <span className="sr-only">{c.nome}</span>
              </label>
            ))}
            <label className="corpo-pequeno flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border border-linha px-3 text-cinza-oliva">
              <input
                type="color"
                value={corMarca.startsWith("#") ? corMarca : "#3d7cf2"}
                onChange={(e) => setCorMarca(e.currentTarget.value)}
                aria-label="Escolher outra cor"
                className="seletor-cor cursor-pointer"
              />
              Outra cor
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="rotulo mb-2 text-cinza-oliva">Formato</legend>
          <div className="flex flex-wrap gap-2">
            {formatos.map((f) => (
              <label key={f} className="cursor-pointer">
                <input type="radio" name="formato" value={f} checked={formato === f} onChange={() => setFormato(f)} className="peer sr-only" />
                <span className="corpo-pequeno inline-flex min-h-11 items-center gap-2 rounded-pill border border-linha px-4 text-cinza-oliva peer-checked:border-giz peer-checked:text-giz peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-verde-lima">
                  <span className="numero">{f}</span> {nomesFormato[f]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2 pt-1">
          <BotaoWhatsApp origem="vinheta" variante="lima" pedido={{ tipo: "video", negocio: nome }} className="self-start">
            Quero um vídeo como este
          </BotaoWhatsApp>
          <p className="corpo-pequeno text-cinza-oliva">A mensagem já vai com o nome do seu negócio.</p>
        </div>
      </form>

      <div className="mx-auto w-full" style={{ maxWidth: formato === "9:16" ? 340 : formato === "1:1" ? 480 : 640 }}>
        <div className="overflow-hidden rounded-md border border-linha">
          <Player
            key={formato}
            ref={player}
            lazyComponent={componente}
            inputProps={inputProps}
            durationInFrames={DURACAO_VINHETA}
            compositionWidth={w}
            compositionHeight={h}
            fps={FPS}
            loop
            autoPlay={!reduzido()}
            controls
            acknowledgeRemotionLicense
            renderLoading={carregando}
            style={{ width: "100%", aspectRatio: `${w} / ${h}` }}
          />
        </div>
        <Rotulo className="mt-3 text-center">A cor escolhida vale só dentro da vinheta</Rotulo>
      </div>
    </div>
  );
}

/* ─────────── Montagem ─────────── */

export default function SalaInterativa() {
  return (
    <div className="flex flex-col gap-6 md:gap-[96px]">
      <section aria-labelledby="titulo-mesa" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 id="titulo-mesa" className="subtitulo">
            Mesa de efeitos
          </h3>
          <p className="corpo max-w-[52ch] text-cinza-oliva">
            Cada quadro é uma animação de verdade, desenhada agora no seu navegador. Passe o mouse ou toque para ver.
          </p>
        </div>
        <MesaEfeitos />
      </section>

      <section aria-labelledby="titulo-linha" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 id="titulo-linha" className="subtitulo">
            Linha do tempo aberta
          </h3>
          <p className="corpo max-w-[52ch] text-cinza-oliva">
            Um vídeo é feito de camadas. Arraste a régua e veja cada uma acender na hora em que entra.
          </p>
        </div>
        <LinhaDoTempo />
      </section>

      <section aria-labelledby="titulo-marca" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 id="titulo-marca" className="subtitulo">
            Sua marca em movimento
          </h3>
          <p className="corpo max-w-[52ch] text-cinza-oliva">
            Digite o nome do seu negócio e escolha a cor. A vinheta muda na hora.
          </p>
        </div>
        <SuaMarca />
      </section>
    </div>
  );
}
