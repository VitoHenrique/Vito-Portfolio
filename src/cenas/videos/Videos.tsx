import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Rotulo } from "@/componentes/Rotulo";
import { Celular } from "@/componentes/Celular";
import { ListaMarcada } from "@/componentes/Marcador";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { AncoraPonto } from "@/motion/AncoraPonto";
import { flags } from "@/conteudo/flags";
import { contatos } from "@/conteudo/site";
import { VideoReel } from "./VideoReel";
import { CarregarSala } from "./CarregarSala";

/** O reel só aparece como publicado a partir da data marcada na fila do Instagram. */
const reelPublicado = () => Date.now() >= new Date(`${flags.reelPublicadoEm}T18:00:00-03:00`).getTime();

/**
 * Cena 8 · Vídeos: a sala de cinema. O Ponto vira obturador e abre a sala.
 * Tudo que é texto e o reel estão no HTML; a parte interativa (Remotion)
 * só carrega quando a cena se aproxima.
 */
export function Videos() {
  const publicado = reelPublicado();
  return (
    <section id="videos" data-cena="08" aria-labelledby="titulo-videos" className="relative px-3 md:px-6">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 pb-6 pt-[120px] md:gap-5 md:pt-[160px]">
        <Rotulo tom="lima">Vídeos e animações</Rotulo>
        <TituloDuasVozes id="titulo-videos" pesada="Seu vídeo" leve="com a cara da sua marca" className="max-w-[16ch]" />
        <p className="corpo max-w-[52ch] text-cinza-oliva">
          Vídeos curtos para Reels, anúncios e apresentações, animados em código. Aqui você não só assiste: você mexe
          no vídeo.
        </p>
      </div>

      {/* O palco: o Ponto pousa no centro e abre a sala como um obturador. */}
      <div data-palco-videos className="relative mx-auto max-w-[1320px]">
        <AncoraPonto
          nome="obturador"
          className="absolute left-1/2 top-1/2 -z-10 w-[22vmin] -translate-x-1/2 -translate-y-1/2"
        />
        <div
          data-sala
          className="relative grid items-center gap-5 overflow-hidden rounded-md border border-linha bg-grafite px-4 py-5 md:grid-cols-[1fr_auto] md:gap-6 md:p-6"
        >
          <div className="flex max-w-[52ch] flex-col gap-4">
            <Rotulo>{publicado ? "Reel publicado no Instagram" : "Reel da vito.dev · 31 s"}</Rotulo>
            <h3 className="subtitulo">3 logos, 1 empresa</h3>
            <p className="corpo text-cinza-oliva">
              Um reel sobre identidade visual, feito do roteiro ao vídeo final aqui na vito.dev. Texto que acompanha a
              fala, legenda pronta e o fecho com a marca.
            </p>
            <ListaMarcada
              className="corpo-pequeno text-cinza-oliva"
              itens={["Legenda gravada e em arquivo (.vtt)", "Começa sem som: ligue quando quiser", "Formato 9:16, pronto para Reels"]}
            />
            <Rotulo>Padaria Sol · projeto demonstrativo</Rotulo>
            <div className="flex flex-wrap gap-3 pt-1">
              <BotaoWhatsApp origem="videos-reel" pedido={{ tipo: "geral" }}>
                Quero um vídeo assim
              </BotaoWhatsApp>
              {publicado && (
                <a
                  href={contatos.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corpo-pequeno inline-flex min-h-11 items-center px-2 text-cinza-oliva underline-offset-4 hover:text-giz hover:underline"
                >
                  Ver no Instagram
                </a>
              )}
            </div>
          </div>
          <Celular rotulo="Reel 3 logos, 1 empresa" className="w-[260px] md:w-[300px]">
            <VideoReel
              src="/video/3-logos-1-empresa.mp4"
              poster="/video/3-logos-1-empresa-capa.avif"
              legendas="/video/3-logos-1-empresa.pt-BR.vtt"
              titulo="Reel 3 logos, 1 empresa, da vito.dev"
            />
          </Celular>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] py-6 md:py-[96px]">
        <CarregarSala
          fallback={
            <div className="flex flex-col gap-3">
              <h3 className="subtitulo">Mesa de efeitos, linha do tempo e sua vinheta</h3>
              <p className="corpo max-w-[52ch] text-cinza-oliva">
                Texto cinético, carimbo do logo, contador, marca-texto, legenda estilo Reels e gráfico animado. Com o
                JavaScript ligado, você testa cada efeito e monta uma vinheta com o nome do seu negócio.
              </p>
            </div>
          }
        />
        <Rotulo className="mt-6">Animado em código com Remotion</Rotulo>
      </div>
    </section>
  );
}
