import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { MonteOSeu } from "./MonteOSeu";

/** Cena 4 · Sites. Fazer o visitante se imaginar cliente. */
export function Sites() {
  return (
    <section id="sites" data-cena="04" aria-labelledby="titulo-sites" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5">
        <TituloDuasVozes id="titulo-sites" pesada="Veja o seu" leve="antes de contratar" className="max-w-[14ch]" />
        <p className="corpo max-w-[48ch] text-cinza-oliva">
          Digite o nome do seu negócio e escolha o tipo. O site monta na hora, do jeito que ele abre no celular do seu
          cliente.
        </p>
        <MonteOSeu />
      </div>
    </section>
  );
}
