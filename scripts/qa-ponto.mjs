// Confere que nenhum texto do herói fica em cima do Ponto, em larguras de celular.
// Uso: node scripts/qa-ponto.mjs <url-base> <pasta>
import { chromium } from "@playwright/test";
const [base = "http://localhost:3210", saida = "qa-ponto"] = process.argv.slice(2);
const telas = [[375, 667], [375, 812], [390, 844], [430, 932], [768, 1024], [1440, 900]];
const paginas = ["/", "/sites", "/sistemas", "/identidade-visual", "/videos"];
const b = await chromium.launch();
let falhas = 0;
for (const [w, h] of telas) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768, deviceScaleFactor: 2 });
  for (const pg of paginas) {
    const p = await ctx.newPage();
    await p.goto(base + pg, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 1800));
    const r = await p.evaluate(() => {
      const a = document.querySelector("#heroi [data-ponto]").getBoundingClientRect();
      const cx = a.left + a.width / 2, cy = a.top + a.height / 2, raio = a.width / 2;
      const dentro = (el) => {
        const t = el.getBoundingClientRect();
        if (!t.width || !t.height) return false;
        // ponto do retângulo mais perto do centro do círculo
        const px = Math.max(t.left, Math.min(cx, t.right)), py = Math.max(t.top, Math.min(cy, t.bottom));
        return Math.hypot(px - cx, py - cy) < raio - 1;
      };
      const textos = [...document.querySelectorAll("#heroi h1 [data-voz], #heroi p, #heroi li, #heroi .rotulo, #heroi a:not(.seta-ponto)")];
      return textos.filter(dentro).map((e) => (e.textContent || "").trim().slice(0, 40));
    });
    if (r.length) falhas++;
    console.log(`${w}x${h} ${pg}: ${r.length ? "TEXTO SOBRE O PONTO -> " + r.join(" | ") : "ok"}`);
    if (w === 390 || w === 375) await p.screenshot({ path: `${saida}/${w}x${h}-${pg === "/" ? "home" : pg.slice(1)}.png` });
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(falhas ? `FALHAS: ${falhas}` : "Nenhum texto sobre o Ponto.");
