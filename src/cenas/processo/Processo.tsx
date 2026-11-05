import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Numero, Rotulo } from "@/componentes/Rotulo";
import { Marcador } from "@/componentes/Marcador";

/**
 * Cena 10 · Como funciona e o Vito. Tirar o medo de contratar.
 * Uma linha desenha as 4 etapas e termina no retrato do Vito (a ilha
 * AnimacaoCenas anima a linha só com transform). Depois, uma conversa
 * SIMULADA com as mensagens reais do WhatsApp Business da vito.dev.
 */
const etapas = [
  { nome: "Entender o negócio", texto: "Uma conversa pelo WhatsApp ou por vídeo. Você me conta o que faz, para quem e o que precisa." },
  { nome: "Prototipar", texto: "Eu mostro como o site vai ficar antes de construir. Você aprova ou pede ajustes." },
  { nome: "Desenvolver", texto: "Construo em código, com o seu conteúdo. O site fica pronto em poucas horas depois do pagamento; com demanda alta, em no máximo 5 dias." },
  { nome: "Colocar no ar", texto: "Domínio, hospedagem e tudo configurado. Depois disso, as pequenas alterações seguem inclusas." },
];

const conversa = [
  { de: "cliente", texto: "Oi! Vim pelo site e quero saber mais sobre os serviços da vito.dev." },
  {
    de: "vito",
    texto:
      "Oi! Aqui é o Vito, da vito.dev. Que bom que você chamou.\n\nPra eu te ajudar mais rápido, me conta:\n1. Qual é o seu negócio?\n2. Você precisa de site, sistema, identidade visual ou vídeo?",
  },
  { de: "cliente", texto: "Tenho uma barbearia. Preciso de site." },
  {
    de: "vito",
    texto:
      "Seu site fica no ar em poucas horas depois do pagamento. Se a demanda estiver alta, em no máximo 5 dias. Tudo combinado antes de começar.",
  },
] as const;

export function Processo({ cena = "10" }: { cena?: string }) {
  return (
    <section id="como-funciona" data-cena={cena} aria-labelledby="titulo-processo" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 md:gap-[96px]">
        <div className="flex flex-col gap-5">
          <TituloDuasVozes id="titulo-processo" pesada="Do material ao ar" leve="em 4 etapas" className="max-w-[12ch]" />
          <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <ol data-linha-processo className="relative grid gap-5 pl-6 lg:grid-cols-4 lg:gap-4 lg:pl-0 lg:pt-8">
              {/* A linha: vertical no celular, horizontal no desktop. */}
              <span aria-hidden data-linha className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-verde-lima lg:hidden" />
              <span aria-hidden data-linha className="absolute left-0 right-[-24px] top-[3px] hidden h-px origin-left bg-verde-lima lg:block" />
              {etapas.map((e, i) => (
                <li key={e.nome} data-etapa className="relative flex flex-col gap-2">
                  <Marcador className="absolute -left-6 top-1.5 lg:-top-[29px] lg:left-0" />
                  <Numero className="text-cinza-oliva">0{i + 1}</Numero>
                  <h3 className="subtitulo">{e.nome}</h3>
                  <p className="corpo-pequeno text-cinza-oliva">{e.texto}</p>
                </li>
              ))}
            </ol>
            <figure className="flex items-center gap-4 lg:w-[260px] lg:flex-col lg:items-start">
              <picture>
                <source srcSet="/marca/vito.avif" type="image/avif" />
                <img
                  src="/marca/vito.webp"
                  alt="Vito, da vito.dev"
                  width={560}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-28 rounded-md border border-linha object-cover lg:w-full"
                />
              </picture>
              <figcaption className="flex flex-col gap-1">
                <span className="subtitulo">Eu sou o Vito.</span>
                <span className="corpo-pequeno text-cinza-oliva">
                  Faço sites desde 2018. Você fala direto comigo, do primeiro contato à entrega.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="flex flex-col gap-3">
            <h3 className="subtitulo">Como é falar comigo</h3>
            <p className="corpo max-w-[44ch] text-cinza-oliva">
              Baseada nas mensagens que eu uso no WhatsApp. A conversa é uma simulação; o atendimento é comigo.
            </p>
            <Rotulo>Simulação</Rotulo>
          </div>
          <ol data-conversa className="flex flex-col gap-3 rounded-md border border-linha bg-grafite-claro p-4" aria-label="Conversa simulada no WhatsApp">
            {conversa.map((m, i) => (
              <li
                key={i}
                data-mensagem
                className={`max-w-[85%] whitespace-pre-line rounded-md px-4 py-3 text-[15px] leading-snug ${m.de === "vito" ? "self-start border border-linha bg-grafite" : "self-end bg-giz text-grafite"}`}
              >
                <span className="sr-only">{m.de === "vito" ? "Vito: " : "Você: "}</span>
                {m.texto}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
