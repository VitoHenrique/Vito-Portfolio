"use client";

import { useEffect, useState } from "react";

/**
 * Medidor real: o LCP deste aparelho, lido do navegador. Nunca número fixo.
 * Acima de 3 s não aparece. Sem a API (Safari, Firefox), não aparece.
 */
const LIMITE_MS = 3000;

export function Medidor() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;
    if (!PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) return;
    let ultimo = 0;
    const anotar = (lista: PerformanceEntryList) => {
      const e = lista.at(-1);
      if (e) ultimo = e.startTime;
    };
    const obs = new PerformanceObserver((l) => anotar(l.getEntries()));
    obs.observe({ type: "largest-contentful-paint", buffered: true });
    // O LCP só se firma depois da carga; mostra o valor desse momento.
    // takeRecords() lê na hora o que o observador ainda não entregou.
    const mostrar = () => {
      anotar(obs.takeRecords());
      obs.disconnect();
      if (ultimo > 0 && ultimo <= LIMITE_MS) setMs(ultimo);
    };
    if (document.readyState === "complete") setTimeout(mostrar, 50);
    else window.addEventListener("load", () => setTimeout(mostrar, 50), { once: true });
    return () => obs.disconnect();
  }, []);

  if (ms === null) return <p className="rotulo invisible min-h-[1.3em]" aria-hidden />;
  // Abaixo de 0,1 s, duas casas: "0,0 s" pareceria número inventado.
  const s = (ms / 1000).toFixed(ms < 100 ? 2 : 1).replace(".", ",");
  return (
    <p className="rotulo min-h-[1.3em] w-fit text-cinza-oliva" aria-live="polite">
      Esta página abriu em <span className="text-verde-lima">{s} s</span>
      <span className="hidden md:inline"> no seu aparelho</span>
    </p>
  );
}
