import { TituloDuasVozes } from "@/componentes/TituloDuasVozes";
import { MonteOSeu } from "./MonteOSeu";

/** Sites · monte o seu. Fazer o visitante se imaginar cliente: o celular fica ao lado do título. */
export function Sites({ cena = "04" }: { cena?: string }) {
  return (
    <section id="sites" data-cena={cena} aria-labelledby="titulo-sites" className="relative px-3 py-6 md:px-6 md:py-[120px]">
      <div className="mx-auto max-w-[1320px]">
        <MonteOSeu
          topo={
            <div className="flex flex-col gap-4 pb-2">
              <TituloDuasVozes id="titulo-sites" pesada="Veja o seu" leve="antes de contratar" className="max-w-[14ch]" />
              <p className="corpo max-w-[48ch] text-cinza-oliva">
                Digite o nome do seu negócio e escolha o tipo. O site monta na hora, do jeito que ele abre no celular do
                seu cliente.
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
