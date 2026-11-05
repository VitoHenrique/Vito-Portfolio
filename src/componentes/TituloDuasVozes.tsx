type Props = {
  /** A parte pesada (800) afirma. Ex.: "Seu site no ar." */
  pesada: string;
  /** A parte leve (300) completa. Ex.: "Ponto" (o ponto final vem em Verde Lima). */
  leve: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** "display" só no herói e no fecho; o resto usa "titulo" (56/40 px). */
  tamanho?: "display" | "titulo";
  /** Na tela verde o texto é Grafite, inclusive o ponto (Lima sobre Lima sumiria). */
  sobreVerde?: boolean;
  className?: string;
  id?: string;
};

/**
 * Assinatura tipográfica: pesada + leve + ponto Verde Lima.
 * Uma por tela, nunca duas visíveis juntas. Os spans com data-voz são os
 * ganchos da animação duasVozes (src/motion); sem JS o título já está inteiro.
 */
export function TituloDuasVozes({ pesada, leve, as: Tag = "h2", tamanho = "titulo", sobreVerde, className = "", id }: Props) {
  const leveSemPonto = leve.replace(/[.]$/, "");
  return (
    <Tag id={id} className={`${tamanho} text-balance ${sobreVerde ? "text-grafite" : "text-giz"} ${className}`}>
      {/* inline-block: transform não age em span inline */}
      <span data-voz="pesada" className="inline-block">
        {pesada}
      </span>{" "}
      {/* O ponto fica dentro da parte leve: assim ele nunca cai sozinho na linha de baixo. */}
      <span data-voz="leve" className="titulo-leve inline-block">
        {leveSemPonto}
        <span data-voz="ponto" className={`inline-block ${sobreVerde ? "text-grafite" : "text-verde-lima"}`}>
          .
        </span>
      </span>
    </Tag>
  );
}
