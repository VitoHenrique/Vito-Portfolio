import { Card } from "@/componentes/Card";
import { ListaMarcada, Losango } from "@/componentes/Marcador";
import { Numero, Rotulo } from "@/componentes/Rotulo";
import { TelaVerde } from "@/componentes/TelaVerde";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { formatarReais, plano, totalEm12Meses, type IdPlano } from "@/conteudo/precos";

/**
 * Cena 9 · Planos. Tela verde curta (uma vez só, sem logo) e corte para os cards.
 * Preços e itens: planos.json e vito-dev-contexto.md. No celular, o Pro vem primeiro.
 */
const detalhes: Record<IdPlano, { paraQuem: string; itens: string[]; botao: string }> = {
  inicial: {
    paraQuem: "Autônomos, barbearias, delivery e profissionais liberais",
    itens: [
      "Site de uma página",
      "Botão flutuante de WhatsApp",
      "Google Maps e Waze",
      "Hospedagem inclusa",
      "Atualizações mensais de texto e fotos",
    ],
    botao: "Chamar no WhatsApp",
  },
  pro: {
    paraQuem: "Clínicas, escritórios e empresas locais",
    itens: [
      "Tudo do Inicial",
      "Até 5 páginas: Home, Sobre, Serviços, Blog e Contato",
      "SEO básico",
      "Área de notícias",
      "E-mails profissionais",
      "Suporte prioritário",
    ],
    botao: "Quero o Pro",
  },
  "sob-medida": {
    paraQuem: "Startups, estoque, painéis financeiros e SaaS",
    itens: [
      "Login seguro",
      "Painel com gráficos",
      "Usuários admin e funcionário",
      "Banco de dados em tempo real",
      "Consultoria de processos",
    ],
    botao: "Pedir orçamento",
  },
};

type Props = {
  cena?: string;
  /** Quais planos esta página mostra: sites mostra Inicial e Pro; sistemas, o sob medida. */
  ids?: IdPlano[];
  verde?: { pesada: string; leve: string; texto: string };
};

const verdePadrao = {
  pesada: "Site profissional",
  leve: "sem susto no fim do mês",
  texto: "Uma implantação e uma mensalidade fixa. Hospedagem, domínio e pequenas alterações inclusos.",
};

/** Os planos ficam no fim de cada produto (não na home), sempre depois da tela verde. */
export function Planos({ cena = "09", ids = ["inicial", "pro"], verde = verdePadrao }: Props) {
  const colunas = ids.length >= 3 ? "lg:grid-cols-3" : ids.length === 2 ? "md:grid-cols-2" : "max-w-[560px]";
  return (
    <section id="planos" data-cena={cena} aria-labelledby="titulo-planos" className="relative">
      <TelaVerde {...verde} />
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-3 py-6 md:px-6 md:py-[96px]">
        <ul className={`grid gap-4 ${colunas}`}>
          {ids.map((id) => {
            const p = plano(id);
            const d = detalhes[id];
            const pro = id === "pro";
            const total = totalEm12Meses(id);
            return (
              <Card as="li" key={id} destaque={pro} className={`flex flex-col gap-4 ${pro ? "order-first lg:order-none" : ""}`}>
                <div className="flex min-h-6 items-center gap-2">
                  {pro && (
                    <>
                      <Losango />
                      <Rotulo tom="lima" as="span">
                        Recomendado
                      </Rotulo>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="subtitulo">{p.nome}</h3>
                  <p className="corpo-pequeno mt-1 text-cinza-oliva">{p.produto}</p>
                </div>
                <p className="corpo-pequeno text-cinza-oliva">Para {d.paraQuem.toLowerCase()}.</p>
                <dl className="grid grid-cols-2 gap-3 border-y border-linha py-4">
                  <div>
                    <dt className="rotulo text-cinza-oliva">Implantação</dt>
                    <dd className="mt-1 text-giz">
                      <Numero>
                        {p.implantacaoAPartirDe !== null
                          ? `A partir de ${formatarReais(p.implantacaoAPartirDe)}`
                          : formatarReais(p.implantacao ?? 0)}
                      </Numero>
                    </dd>
                  </div>
                  <div>
                    <dt className="rotulo text-cinza-oliva">Mensalidade</dt>
                    <dd className="mt-1 text-verde-lima">
                      <Numero>{p.mensalidade !== null ? formatarReais(p.mensalidade) : "Sob consulta"}</Numero>
                    </dd>
                  </div>
                  {total !== null && (
                    <div className="col-span-2">
                      <dt className="rotulo text-cinza-oliva">Total em 12 meses</dt>
                      <dd className="mt-1 text-giz">
                        <Numero>{formatarReais(total)}</Numero>
                      </dd>
                    </div>
                  )}
                </dl>
                <ListaMarcada className="corpo-pequeno text-giz" itens={d.itens} />
                <BotaoWhatsApp
                  origem={`planos-${id}`}
                  pedido={{ tipo: "plano", plano: id }}
                  variante={pro ? "lima" : "giz"}
                  className="mt-auto self-start"
                >
                  {d.botao}
                </BotaoWhatsApp>
              </Card>
            );
          })}
        </ul>
        {ids.includes("inicial") && (
          <p className="corpo-pequeno text-cinza-oliva">Precisa de algo maior? O sistema sob medida tem a sua página.</p>
        )}
      </div>
    </section>
  );
}
