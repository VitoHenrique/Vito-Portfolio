import { Moldura } from "@/componentes/Moldura";
import { Heroi } from "@/cenas/heroi/Heroi";
import { Oficios } from "@/cenas/oficios/Oficios";
import { Processo } from "@/cenas/processo/Processo";
import { Planos } from "@/cenas/planos/Planos";
import { Fecho } from "@/cenas/fecho/Fecho";
import { Abertura } from "@/motion/Motor";

/**
 * Home curta: o visitante conhece, escolhe o interesse e fecha.
 * 0 carimbo · 1 herói · 2 "Do que você precisa?" (leva às páginas de cada
 * serviço, com os exemplos) · 3 como funciona e o Vito · 4 planos (tela verde)
 * · 5 perguntas e fecho. Uma ação principal em tudo: o WhatsApp.
 */
export default function Home() {
  return (
    <Moldura ilhas={<Abertura />}>
      <Heroi />
      <Oficios cena="02" />
      <Processo cena="03" />
      <Planos cena="04" />
      <Fecho cena="05" />
    </Moldura>
  );
}
