import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Celular } from "@/componentes/Celular";
import { ListaMarcada } from "@/componentes/Marcador";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { contatos } from "@/conteudo/site";
import { CarregarPerfil } from "./CarregarPerfil";

/**
 * Cena 7 · Instagram. A marca em uso, com conteúdo real do perfil.
 * Social media aparece como "peças para redes" (padrão da pergunta 2):
 * a vito.dev cria as peças, sem prometer gestão de perfil.
 */
export function Instagram({ cena = "07" }: { cena?: string }) {
  return (
    <section id="instagram" data-cena={cena} aria-labelledby="titulo-instagram" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto grid max-w-[1320px] items-center gap-5 md:grid-cols-[1fr_auto] md:gap-6">
        <div className="flex flex-col gap-4">
          <TituloDuasVozes id="titulo-instagram" pesada="Sua marca" leve="no feed" className="max-w-[10ch]" />
          <p className="corpo max-w-[46ch] text-cinza-oliva">
            Este é o perfil da vito.dev, com os posts de verdade. Toque nos destaques, abra um post e passe os slides.
          </p>
          <ListaMarcada
            className="corpo text-cinza-oliva"
            itens={[
              "Um estilo de arte por linha da grade",
              "Carrosséis com um gráfico de linha por slide",
              "As mesmas cores e fontes do site, do cartão e dos vídeos",
            ]}
          />
          <p className="corpo-pequeno max-w-[46ch] text-cinza-oliva">
            Peças para redes fazem parte da identidade visual. Quem publica e responde é você.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <BotaoWhatsApp origem="instagram">Quero peças assim</BotaoWhatsApp>
            <a href={contatos.instagramLink} target="_blank" rel="noopener noreferrer" className="corpo-pequeno inline-flex min-h-11 items-center px-2 text-cinza-oliva hover:text-giz">
              {contatos.instagram}
            </a>
          </div>
        </div>
        <Celular rotulo="Perfil @vitodev.oficial no celular" className="w-[min(100%,340px)] md:w-[340px]">
          <CarregarPerfil />
        </Celular>
      </div>
    </section>
  );
}
