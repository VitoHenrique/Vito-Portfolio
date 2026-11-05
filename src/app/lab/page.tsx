import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Logo, type VarianteLogo } from "@/componentes/Logo";
import { Botao, BotaoWhatsApp } from "@/componentes/Botao";
import { Card } from "@/componentes/Card";
import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Numero, Rotulo } from "@/componentes/Rotulo";
import { ListaMarcada, Losango } from "@/componentes/Marcador";
import { Celular } from "@/componentes/Celular";
import { formatarReais, planos, totalEm12Meses } from "@/conteudo/precos";
import { curvas, tempos } from "@/motion/curvas";
import { AncoraPonto, Ponto } from "@/motion/Ponto";
import { Filme } from "@/motion/Filme";
import { LabMovimento } from "./LabMovimento";

export const metadata: Metadata = {
  title: "Laboratório",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
};

const cores = [
  ["Verde Lima", "bg-verde-lima", "#A8E63D", "5%: ponto, preço, destaque"],
  ["Grafite", "bg-grafite", "#0E0F0C", "80%: fundo de tudo"],
  ["Grafite Claro", "bg-grafite-claro", "#181A15", "Cards e áreas elevadas"],
  ["Linha", "bg-linha", "#2B2E26", "Bordas, nunca texto"],
  ["Giz", "bg-giz", "#F2F1EA", "Títulos e texto"],
  ["Cinza Oliva", "bg-cinza-oliva", "#A3A595", "Apoio e rótulos"],
  ["Coral", "bg-coral", "#FF6B4A", "Só o antes, lento ou erro"],
] as const;

const logos: [VarianteLogo, number][] = [
  ["horizontal", 240],
  ["horizontal-simbolo", 280],
  ["vertical", 200],
  ["reduzida", 120],
  ["simbolo", 64],
  ["mono-claro", 200],
];

function Bloco({ titulo, children, cena }: { titulo: string; children: ReactNode; cena?: string }) {
  return (
    <section data-cena={cena} className="relative border-t border-linha py-6">
      <Rotulo as="p" className="mb-4">
        {titulo}
      </Rotulo>
      {children}
    </section>
  );
}

export default function Lab() {
  const inicial = planos[0]!;
  return (
    <>
      <Ponto />
      <Filme />
      <main id="conteudo" className="relative z-10 mx-auto max-w-[1200px] px-3 pb-6 md:px-5">
        <header className="flex items-center justify-between gap-4 py-5">
          <Logo largura={160} prioridade />
          <Rotulo tom="lima">/lab · sem indexação</Rotulo>
        </header>

        <section data-cena="01" className="relative flex min-h-[80dvh] flex-col justify-center py-6">
          <AncoraPonto
            nome="lab-canto"
            className="absolute -right-[18vmin] -top-[18vmin] w-[56vmin] md:-right-[12vmin]"
          />
          <h1 className="titulo max-w-[14ch]">Fundação do site 2026</h1>
          <p className="corpo mt-4 max-w-[52ch] text-cinza-oliva">
            Tokens, fontes, logos, componentes e o sistema de movimento. Role a página para ver o Ponto viajar
            entre as âncoras e o contador de cena no canto.
          </p>
        </section>

        <Bloco titulo="Cores">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {cores.map(([nome, classe, hex, uso]) => (
              <li key={nome} className="flex flex-col gap-2">
                <span className={`block aspect-square rounded-md border border-linha ${classe}`} />
                <span className="corpo-pequeno font-semibold">{nome}</span>
                <span className="numero text-cinza-oliva">{hex}</span>
                <span className="corpo-pequeno text-cinza-oliva">{uso}</span>
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Tipografia">
          <div className="flex flex-col gap-4">
            <p className="display">Display 112</p>
            <p className="titulo">Título 56/40</p>
            <p className="titulo titulo-leve">Título leve 300</p>
            <p className="subtitulo">Subtítulo 24</p>
            <p className="corpo max-w-[60ch]">
              Corpo 18/17. Sites e sistemas feitos em código, com mensalidade fixa. Atendimento direto comigo, de
              onde você estiver.
            </p>
            <p className="corpo-pequeno text-cinza-oliva">Corpo pequeno 15. Válida por 15 dias.</p>
            <Rotulo>Rótulo Martian Mono 13</Rotulo>
            <Numero>R$ 199,90 · 0,8 s · 5 DIAS ÚTEIS</Numero>
          </div>
        </Bloco>

        <Bloco titulo="Título em duas vozes" cena="02">
          <div className="relative min-h-[40dvh]">
            <AncoraPonto nome="lab-centro" carimbo className="absolute right-[8%] top-[10%] w-24 md:w-32" />
            <TituloDuasVozes pesada="Site profissional" leve="sem susto no fim do mês" />
          </div>
        </Bloco>

        <Bloco titulo="Botões">
          <div className="flex flex-wrap gap-3">
            <BotaoWhatsApp origem="lab" />
            <BotaoWhatsApp origem="lab" variante="lima" pedido={{ tipo: "plano", plano: "pro" }}>
              Quero o Pro
            </BotaoWhatsApp>
            <Botao variante="secundario" href="#conteudo">
              Ver planos
            </Botao>
          </div>
        </Bloco>

        <Bloco titulo="Cards, marcadores e preços">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="subtitulo">{inicial.nome}</p>
              <p className="corpo-pequeno mt-1 text-cinza-oliva">{inicial.produto}</p>
              <ListaMarcada
                className="corpo mt-4"
                itens={["Site de uma página", "Botão de WhatsApp", "Hospedagem inclusa"]}
              />
              <p className="mt-4 text-verde-lima">
                <Numero>{formatarReais(inicial.mensalidade ?? 0)}/mês</Numero>
              </p>
              <p className="corpo-pequeno text-cinza-oliva">
                Em 12 meses: <Numero>{formatarReais(totalEm12Meses("inicial") ?? 0)}</Numero>
              </p>
            </Card>
            <Card destaque>
              <div className="flex items-center gap-2">
                <Losango />
                <Rotulo tom="lima">Recomendado</Rotulo>
              </div>
              <p className="subtitulo mt-3">Card em destaque</p>
              <p className="corpo-pequeno mt-1 text-cinza-oliva">Borda Verde Lima, o resto igual.</p>
            </Card>
          </div>
        </Bloco>

        <Bloco titulo="Logos oficiais (arquivos, nunca redigitados)">
          <div className="flex flex-wrap items-end gap-6">
            {logos.map(([v, l]) => (
              <figure key={v} className="flex flex-col gap-2">
                <Logo variante={v} largura={l} />
                <figcaption className="rotulo text-cinza-oliva">{v}</figcaption>
              </figure>
            ))}
          </div>
        </Bloco>

        <Bloco titulo="Movimento" cena="03">
          <dl className="mb-5 grid gap-2 md:grid-cols-3">
            {[
              ["entrada", `cubic-bezier(${curvas.entrada.join(", ")})`],
              ["saída", `cubic-bezier(${curvas.saida.join(", ")})`],
              ["cascata", `${tempos.cascata} s`],
              ["duasVozes", "0 · +0,12 · +0,28 s"],
              ["carimbo", "0 → 1,18 → 1 em 0,35 s"],
              ["corte", `até ${tempos.corte} s`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm border border-linha px-3 py-2">
                <dt className="rotulo text-cinza-oliva">{k}</dt>
                <dd className="numero mt-1">{v}</dd>
              </div>
            ))}
          </dl>
          <LabMovimento />
        </Bloco>

        <Bloco titulo="Celular" cena="04">
          <div className="relative grid items-center gap-6 md:grid-cols-2">
            <AncoraPonto nome="lab-celular" className="absolute -left-[30vmin] bottom-0 w-[40vmin]" />
            <Celular rotulo="Exemplo de tela no celular">
              <div className="flex h-full flex-col justify-end gap-3 p-4 pb-6">
                <Rotulo tom="lima">Dados de exemplo</Rotulo>
                <p className="subtitulo">Barbearia do Bairro</p>
                <p className="corpo-pequeno text-cinza-oliva">Corte e barba com hora marcada.</p>
                <span className="rounded-pill bg-giz py-3 text-center font-semibold text-grafite">
                  Chamar no WhatsApp
                </span>
              </div>
            </Celular>
            <p className="corpo text-cinza-oliva">
              Moldura própria, sem marca de fabricante. A tela é 9:19,5 e recorta o conteúdo.
            </p>
          </div>
        </Bloco>
      </main>
    </>
  );
}
