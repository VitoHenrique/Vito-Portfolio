// Print de cada cena da home (desktop e celular) + erros de console.
// Uso: node scripts/qa-cenas.mjs <url> <pasta> [reduce]
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3210/";
const saida = path.resolve(process.argv[3] ?? "qa-cenas");
const reducedMotion = process.argv[4] === "reduce" ? "reduce" : "no-preference";
await mkdir(saida, { recursive: true });
const cenas = ["heroi", "corrida", "servicos", "sites", "sistemas", "identidade", "instagram", "videos", "planos", "como-funciona", "perguntas", "fecho"];
const navegador = await chromium.launch();
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [nome, ctxOpts] of [
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["celular", { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } }],
]) {
  const ctx = await navegador.newContext({ ...ctxOpts, reducedMotion });
  const page = await ctx.newPage();
  const erros = [];
  page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  page.on("pageerror", (e) => erros.push(String(e)));
  await page.goto(url, { waitUntil: "load" });
  await esperar(2000);
  for (const [i, id] of cenas.entries()) {
    // Desce aos poucos até a cena, para os gatilhos de scroll dispararem em ordem.
    const alvo = await page.evaluate((s) => {
      const el = document.getElementById(s);
      return el ? el.getBoundingClientRect().top + scrollY - 72 : null;
    }, id);
    if (alvo === null) continue;
    // Para quando chega, quando a página acaba (alvo além do fim) ou depois de 80 passos.
    let anterior = -1;
    for (let passo = 0; passo < 80; passo++) {
      const y = await page.evaluate(() => scrollY);
      if (Math.abs(alvo - y) < 10 || y === anterior) break;
      anterior = y;
      await page.evaluate(([y0, a]) => scrollTo(0, y0 + Math.sign(a - y0) * Math.min(400, Math.abs(a - y0))), [y, alvo]);
      await esperar(80);
    }
    await esperar(1400);
    await page.screenshot({ path: path.join(saida, `${nome}-${String(i).padStart(2, "0")}-${id}.png`) });
  }
  const largura = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(nome, reducedMotion, "erros:", erros.length ? erros : "nenhum", "rolagem lateral:", largura > ctxOpts.viewport.width);
  await ctx.close();
}
await navegador.close();
