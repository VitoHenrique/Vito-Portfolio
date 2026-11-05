// Print de cada cena de cada página (desktop e celular) + erros de console e rolagem lateral.
// Uso: node scripts/qa-cenas.mjs <url-base> <pasta> [reduce]
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = (process.argv[2] ?? "http://localhost:3210").replace(/\/$/, "");
const saida = path.resolve(process.argv[3] ?? "qa-cenas");
const reducedMotion = process.argv[4] === "reduce" ? "reduce" : "no-preference";
const paginas = ["/", "/sites", "/sistemas", "/identidade-visual", "/videos"];
await mkdir(saida, { recursive: true });
const navegador = await chromium.launch();
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [tela, ctxOpts] of [
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["celular", { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } }],
]) {
  const ctx = await navegador.newContext({ ...ctxOpts, reducedMotion });
  for (const pagina of paginas) {
    const page = await ctx.newPage();
    const erros = [];
    page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
    page.on("pageerror", (e) => erros.push(String(e)));
    await page.goto(base + pagina, { waitUntil: "load" });
    await esperar(1800);
    const ids = await page.evaluate(() => [...document.querySelectorAll("section[data-cena][id]")].map((s) => s.id));
    for (const [i, id] of ids.entries()) {
      // Desce em passos até a cena, para os gatilhos de scroll dispararem em ordem.
      let anterior = -1;
      for (let passo = 0; passo < 80; passo++) {
        const [y, alvo] = await page.evaluate((s) => [scrollY, document.getElementById(s).getBoundingClientRect().top + scrollY - 72], id);
        if (Math.abs(alvo - y) < 10 || y === anterior) break;
        anterior = y;
        await page.evaluate(([y0, a]) => scrollTo(0, y0 + Math.sign(a - y0) * Math.min(400, Math.abs(a - y0))), [y, alvo]);
        await esperar(80);
      }
      await esperar(1200);
      const nome = pagina === "/" ? "home" : pagina.slice(1);
      await page.screenshot({ path: path.join(saida, `${tela}-${nome}-${String(i).padStart(2, "0")}-${id}.png`) });
    }
    const largura = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(tela, reducedMotion, pagina, "cenas:", ids.length, "erros:", erros.length ? erros : "nenhum", "rolagem lateral:", largura > ctxOpts.viewport.width);
    await page.close();
  }
  await ctx.close();
}
await navegador.close();
