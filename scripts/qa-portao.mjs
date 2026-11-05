// QA dos portões: grava a tela no desktop e no celular, tira prints em
// 390, 768 e 1440 px (com e sem movimento reduzido) e junta os erros de console.
// Uso: node scripts/qa-portao.mjs <url> <pasta-de-saida>
import { chromium, devices } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3210/";
const saida = path.resolve(process.argv[3] ?? "qa");
await mkdir(saida, { recursive: true });
const navegador = await chromium.launch();
const relatorio = { url, quando: new Date().toISOString(), execucoes: [] };

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function rolarAte(page, seletor, { passo = 120, pausa = 60, roda = true } = {}) {
  // Com Lenis a rolagem continua depois da roda: manda a distância em passos,
  // espera assentar e corrige o resto, em vez de ler scrollY a cada passo.
  for (let tentativa = 0; tentativa < 4; tentativa++) {
    const falta = await page.evaluate((s) => {
      const el = document.querySelector(s);
      return el ? el.getBoundingClientRect().top - 90 : document.body.scrollHeight - scrollY;
    }, seletor);
    if (Math.abs(falta) < 40) break;
    const passos = Math.max(1, Math.round(Math.abs(falta) / passo));
    for (let i = 0; i < passos; i++) {
      const d = Math.sign(falta) * Math.min(passo, Math.abs(falta) - i * passo);
      if (roda) await page.mouse.wheel(0, d);
      else await page.evaluate((p) => scrollBy(0, p), d);
      await esperar(pausa);
    }
    await esperar(roda ? 1400 : 400);
  }
  await esperar(400);
}

async function gravar(nome, contexto, { roda }) {
  const ctx = await navegador.newContext({ ...contexto, recordVideo: { dir: saida, size: contexto.viewport } });
  const page = await ctx.newPage();
  const erros = [];
  page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  page.on("pageerror", (e) => erros.push(String(e)));
  await page.goto(url, { waitUntil: "load" });
  await esperar(2200); // abertura (cena 0) + medidor
  await page.screenshot({ path: path.join(saida, `${nome}-1-heroi.png`) });
  await rolarAte(page, "[data-palco-videos]", { roda });
  await rolarAte(page, "#titulo-mesa", { roda, passo: 80 });
  await page.screenshot({ path: path.join(saida, `${nome}-2-sala.png`) });
  const card = page.locator("ul[aria-label='Efeitos de vídeo'] button").first();
  if (roda) await card.hover();
  else await card.tap();
  await esperar(1800);
  await page.screenshot({ path: path.join(saida, `${nome}-3-mesa.png`) });
  await rolarAte(page, "#titulo-linha", { roda });
  const regua = page.locator("input[type=range]");
  const caixa = await regua.boundingBox();
  if (caixa) {
    await page.mouse.move(caixa.x + 4, caixa.y + caixa.height / 2);
    await page.mouse.down();
    for (let i = 0; i <= 20; i++) {
      await page.mouse.move(caixa.x + 4 + (caixa.width - 8) * (i / 20), caixa.y + caixa.height / 2);
      await esperar(70);
    }
    await page.mouse.up();
  }
  await page.screenshot({ path: path.join(saida, `${nome}-4-linha.png`) });
  await rolarAte(page, "#titulo-marca", { roda });
  await page.locator("input[autocomplete=organization]").pressSequentially("Barbearia do Zé", { delay: 70 });
  await page.locator("label:has(input[value='16:9'])").click();
  await esperar(2200);
  await page.screenshot({ path: path.join(saida, `${nome}-5-marca.png`) });
  await rolarAte(page, "#planos", { roda });
  await page.screenshot({ path: path.join(saida, `${nome}-6-planos.png`) });
  const larguraDoc = await page.evaluate(() => document.documentElement.scrollWidth);
  await ctx.close();
  relatorio.execucoes.push({ nome, erros, rolagemLateral: larguraDoc > contexto.viewport.width });
}

await gravar("desktop", { viewport: { width: 1440, height: 900 } }, { roda: true });
await gravar("celular", { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } }, { roda: false });

// Prints estáticos com e sem movimento reduzido.
for (const largura of [390, 768, 1440]) {
  for (const reducedMotion of ["no-preference", "reduce"]) {
    const ctx = await navegador.newContext({ viewport: { width: largura, height: 900 }, reducedMotion });
    const page = await ctx.newPage();
    const erros = [];
    page.on("pageerror", (e) => erros.push(String(e)));
    await page.goto(url, { waitUntil: "load" });
    await esperar(1500);
    const info = await page.evaluate(() => ({
      pontoVivo: document.documentElement.classList.contains("ponto-vivo"),
      abertura: document.documentElement.classList.contains("abertura"),
      larguraDoc: document.documentElement.scrollWidth,
      botaoVisivel: (() => {
        const b = document.querySelector("#heroi [data-origem=heroi]");
        return b ? b.getBoundingClientRect().bottom <= innerHeight : false;
      })(),
    }));
    await page.screenshot({ path: path.join(saida, `print-${largura}-${reducedMotion}.png`) });
    relatorio.execucoes.push({ nome: `print-${largura}-${reducedMotion}`, erros, ...info, rolagemLateral: info.larguraDoc > largura });
    await ctx.close();
  }
}

await navegador.close();
await writeFile(path.join(saida, "relatorio.json"), JSON.stringify(relatorio, null, 2));
console.log(JSON.stringify(relatorio, null, 2));
