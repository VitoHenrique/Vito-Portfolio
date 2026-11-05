import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { Numero, Rotulo } from "@/componentes/Rotulo";
import { BotaoWhatsApp } from "@/componentes/Botao";

/**
 * Cena 5 · Sistemas. A planilha vira sistema.
 * Sem JS, no celular e com movimento reduzido: três quadros lado a lado
 * (planilha, login, painel). No desktop, a ilha AnimacaoSistemas prende a
 * cena e o scroll faz as células voarem até formar o painel.
 * Troca ADMIN / FUNCIONÁRIO só com CSS (:has), sem JavaScript.
 * Todos os números são DADOS DE EXEMPLO.
 */
const celulas = [
  ["Produto", "Qtd", "Preço"],
  ["Pão francês", "120", "0,80"],
  ["Café 500 g", "??", "18,90"],
  ["Pão francês", "120", "0,80"],
  ["Bolo", "#REF!", "32,00"],
  ["Leite", "40", "#VALOR!"],
];
const ehErro = (v: string) => v.startsWith("#") || v === "??";

export function Sistemas({ cena = "05" }: { cena?: string }) {
  return (
    <section id="sistemas" data-cena={cena} aria-labelledby="titulo-sistemas" className="sistema relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5">
        <TituloDuasVozes id="titulo-sistemas" pesada="Sua planilha" leve="pode virar sistema" className="max-w-[14ch]" />
        <p className="corpo max-w-[50ch] text-cinza-oliva">
          Estoque, agenda, pedidos e financeiro num lugar só, com login e cada pessoa vendo só o que precisa.
        </p>

        <div data-palco-sistemas className="relative">
          <div data-quadros className="grid gap-4 lg:grid-cols-3">
            {/* 1 · Planilha */}
            <figure data-quadro="planilha" className="rounded-md border border-linha bg-grafite-claro p-4">
              <figcaption className="rotulo mb-3 text-cinza-oliva">Antes · estoque_final_v3.xlsx</figcaption>
              <div className="grid grid-cols-[1.6fr_0.8fr_0.9fr] gap-px overflow-hidden rounded-sm bg-linha">
                {celulas.flat().map((v, i) => (
                  <span
                    key={i}
                    data-celula
                    className={`numero !text-[12px] bg-grafite px-2 py-2 ${i < 3 ? "text-cinza-oliva" : ""} ${ehErro(v) ? "text-coral" : ""}`}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <p className="corpo-pequeno mt-3 text-coral">Linha repetida, fórmula quebrada e ninguém sabe qual é a versão certa.</p>
            </figure>

            {/* 2 · Login */}
            <figure data-quadro="login" className="flex flex-col justify-center gap-3 rounded-md border border-linha bg-grafite-claro p-5">
              <figcaption className="rotulo text-cinza-oliva">Login seguro</figcaption>
              <span className="subtitulo">Entrar</span>
              <span className="corpo-pequeno rounded-sm border border-linha px-3 py-3 text-cinza-oliva">equipe@padaria.com</span>
              <span className="corpo-pequeno rounded-sm border border-linha px-3 py-3 text-cinza-oliva">••••••••</span>
              <span className="rounded-pill bg-giz py-3 text-center text-sm font-semibold text-grafite">Entrar</span>
            </figure>

            {/* 3 · Painel */}
            <figure data-quadro="painel" className="flex flex-col gap-3 rounded-md border border-linha bg-grafite-claro p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <figcaption className="rotulo text-cinza-oliva">Painel</figcaption>
                <fieldset className="flex gap-1 rounded-pill border border-linha p-1">
                  <legend className="sr-only">Ver como</legend>
                  {(["admin", "funcionario"] as const).map((v) => (
                    <label key={v} className="cursor-pointer">
                      <input type="radio" name="perfil-sistema" value={v} defaultChecked={v === "admin"} className="peer sr-only" />
                      <span className="rotulo inline-flex min-h-9 items-center rounded-pill px-3 text-cinza-oliva peer-checked:bg-giz peer-checked:text-grafite peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-verde-lima">
                        {v === "admin" ? "Admin" : "Funcionário"}
                      </span>
                    </label>
                  ))}
                </fieldset>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div data-widget className="rounded-sm border border-linha p-3">
                  <p className="corpo-pequeno text-cinza-oliva">Pedidos hoje</p>
                  <Numero className="!text-xl">18</Numero>
                </div>
                <div data-widget className="rounded-sm border border-linha p-3">
                  <p className="corpo-pequeno text-cinza-oliva">Estoque baixo</p>
                  <Numero className="!text-xl">3 itens</Numero>
                </div>
                <div data-widget data-so-admin className="col-span-2 rounded-sm border border-linha p-3">
                  <p className="corpo-pequeno text-cinza-oliva">Faturamento do mês</p>
                  <Numero className="!text-xl text-verde-lima">R$ 12.480</Numero>
                  <div className="mt-2 flex h-12 items-end gap-1.5" aria-hidden>
                    {[30, 45, 38, 60, 52, 74, 90].map((h, i) => (
                      <span key={i} className={`flex-1 rounded-t-sm ${i === 6 ? "bg-verde-lima" : "bg-linha"}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div data-widget data-so-admin className="col-span-2 rounded-sm border border-linha p-3">
                  <p className="corpo-pequeno text-cinza-oliva">Usuários</p>
                  <p className="corpo-pequeno mt-1">Ana · admin</p>
                  <p className="corpo-pequeno">Bruno · funcionário</p>
                </div>
                <p data-so-funcionario className="corpo-pequeno col-span-2 text-cinza-oliva">
                  O funcionário vê pedidos e estoque. Faturamento e usuários ficam só com o admin.
                </p>
              </div>
            </figure>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <BotaoWhatsApp origem="sistemas" pedido={{ tipo: "plano", plano: "sob-medida" }}>
            Pedir orçamento
          </BotaoWhatsApp>
          <Rotulo as="span">Dados de exemplo · implantação a partir de R$ 1.000</Rotulo>
        </div>
      </div>
    </section>
  );
}
