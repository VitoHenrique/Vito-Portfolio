"use client";

import { useId, useState } from "react";
import { Celular } from "@/componentes/Celular";
import { Rotulo } from "@/componentes/Rotulo";
import { ListaMarcada } from "@/componentes/Marcador";
import { BotaoWhatsApp } from "@/componentes/Botao";
import { LIMITE_NOME, limparNomeNegocio } from "@/conteudo/whatsapp";

/**
 * Cena 4 · Sites: monte o seu. O visitante digita o nome do negócio, escolhe
 * o tipo e vê o site montando no celular. É uma prévia com dados de exemplo,
 * e diz isso. Nada do que é digitado é guardado.
 */
const tipos = {
  barbearia: { nome: "Barbearia", chamada: "Corte e barba com hora marcada.", itens: ["Corte", "Barba", "Pacote corte + barba"], botao: "Agendar pelo WhatsApp" },
  clinica: { nome: "Clínica", chamada: "Atendimento com hora marcada e equipe qualificada.", itens: ["Consultas", "Exames", "Retorno"], botao: "Marcar consulta" },
  delivery: { nome: "Delivery", chamada: "Peça pelo WhatsApp e receba em casa.", itens: ["Cardápio do dia", "Combos", "Bebidas"], botao: "Fazer pedido" },
  escritorio: { nome: "Escritório", chamada: "Atendimento próximo, do primeiro contato à solução.", itens: ["Consultoria", "Contratos", "Acompanhamento"], botao: "Falar com a equipe" },
  loja: { nome: "Loja", chamada: "Os produtos que você procura, com entrega combinada.", itens: ["Novidades", "Mais vendidos", "Promoções"], botao: "Ver produtos" },
} as const;
type Tipo = keyof typeof tipos;

export function MonteOSeu() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<Tipo>("barbearia");
  const idNome = useId();
  const t = tipos[tipo];
  const negocio = limparNomeNegocio(nome) || `Sua ${t.nome.toLowerCase()}`;

  return (
    <div className="grid items-start gap-5 md:grid-cols-[1fr_auto] md:gap-6">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()} data-evento="previa_montada">
        <div className="flex flex-col gap-2">
          <label htmlFor={idNome} className="rotulo text-cinza-oliva">
            Nome do seu negócio
          </label>
          <input
            id={idNome}
            type="text"
            maxLength={LIMITE_NOME}
            autoComplete="organization"
            value={nome}
            onChange={(e) => setNome(e.currentTarget.value)}
            placeholder="Ex.: Barbearia do Zé"
            className="corpo min-h-12 rounded-sm border border-linha bg-grafite-claro px-4 text-giz placeholder:text-cinza-oliva"
          />
          <p className="corpo-pequeno text-cinza-oliva">Fica só na sua tela: não guardo o que você digita.</p>
        </div>
        <fieldset>
          <legend className="rotulo mb-2 text-cinza-oliva">Tipo de negócio</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(tipos) as Tipo[]).map((k) => (
              <label key={k} className="cursor-pointer">
                <input type="radio" name="tipo-negocio" value={k} checked={tipo === k} onChange={() => setTipo(k)} className="peer sr-only" />
                <span className="corpo-pequeno inline-flex min-h-11 items-center rounded-pill border border-linha px-4 text-cinza-oliva peer-checked:border-giz peer-checked:text-giz peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-verde-lima">
                  {tipos[k].nome}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <ListaMarcada
          className="corpo-pequeno text-cinza-oliva"
          itens={["Página única no ar em até 5 dias úteis", "Botão de WhatsApp, mapa e hospedagem inclusos", "Seu conteúdo de verdade entra no lugar do exemplo"]}
        />
        <BotaoWhatsApp origem="previa" pedido={{ tipo: "previa", negocio: nome }} className="self-start !whitespace-normal text-center">
          Enviar esta prévia pelo WhatsApp
        </BotaoWhatsApp>
      </form>

      <div className="flex flex-col items-center gap-3">
        <Celular rotulo={`Prévia do site de ${negocio}`} className="w-[260px] md:w-[290px]">
          <div className="flex h-full flex-col overflow-y-auto pb-4 pt-11" aria-live="polite">
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="text-sm font-extrabold tracking-[-0.02em]">{negocio}</span>
              <span className="size-2 rounded-pill bg-verde-lima" aria-hidden />
            </div>
            <div className="mx-4 flex aspect-[4/3] items-end rounded-sm border border-linha bg-grafite-claro p-3">
              <span className="rotulo !text-[10px] text-cinza-oliva">Foto do seu negócio</span>
            </div>
            <div className="flex flex-col gap-2 px-4 pt-4">
              <p className="text-xl font-extrabold leading-tight tracking-[-0.02em]">{negocio}</p>
              <p className="corpo-pequeno !text-[13px] text-cinza-oliva">{t.chamada}</p>
              <span className="mt-2 rounded-pill bg-giz py-2.5 text-center text-[13px] font-semibold text-grafite">{t.botao}</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2 px-4">
              {t.itens.map((i) => (
                <li key={i} className="flex items-center justify-between rounded-sm border border-linha px-3 py-2 text-[13px]">
                  {i} <span className="size-1.5 rounded-pill bg-verde-lima" aria-hidden />
                </li>
              ))}
            </ul>
            <div className="mx-4 mt-4 flex h-20 items-center justify-center rounded-sm border border-linha">
              <span className="rotulo !text-[10px] text-cinza-oliva">Mapa e horário</span>
            </div>
          </div>
        </Celular>
        <Rotulo>Prévia · dados de exemplo</Rotulo>
      </div>
    </div>
  );
}
