import { Moldura } from "@/componentes/Moldura";
import { Heroi } from "@/cenas/heroi/Heroi";
import { Oficios } from "@/cenas/oficios/Oficios";
import { Processo } from "@/cenas/processo/Processo";
import { Fecho } from "@/cenas/fecho/Fecho";
import { Abertura } from "@/motion/Motor";

/**
 * Home curta: o visitante conhece, escolhe o interesse e fecha.
 * 0 carimbo · 1 herói · 2 "Do que você precisa?" (leva às páginas de cada
 * serviço, com exemplos e planos) · 3 como funciona e o Vito · 4 perguntas e
 * fecho. Os planos ficam no fim de cada produto, não aqui (pedido do Vito).
 */
export default function Home() {
  return (
    <Moldura ilhas={<Abertura />}>
      <Heroi />
      <Oficios cena="02" />
      <Processo cena="03" />
      <Fecho cena="04" />
    </Moldura>
  );
}
