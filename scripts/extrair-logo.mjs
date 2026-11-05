// Extrai as três partes do wordmark oficial (vito, ponto, dev) para animar
// cada uma em camada própria, sem redigitar nada. Fonte: o SVG oficial.
// Uso: node scripts/extrair-logo.mjs
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile(new URL("../public/marca/vito-dev_horizontal_positivo.svg", import.meta.url), "utf8");
const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
const transform = svg.match(/<g transform="([^"]+)"/)[1];
const caminhos = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
if (caminhos.length !== 3) throw new Error(`Esperava 3 caminhos, achei ${caminhos.length}`);
const [vito, ponto, dev] = caminhos;

const saida = `// GERADO por scripts/extrair-logo.mjs a partir de public/marca/vito-dev_horizontal_positivo.svg.
// Não edite à mão: rode \`npm run logo\` se o SVG oficial mudar.
export const wordmark = {
  viewBox: ${JSON.stringify(viewBox)},
  transform: ${JSON.stringify(transform)},
  vito: ${JSON.stringify(vito)},
  ponto: ${JSON.stringify(ponto)},
  dev: ${JSON.stringify(dev)},
} as const;
`;
await writeFile(new URL("../src/marca/wordmark.ts", import.meta.url), saida);
console.log("src/marca/wordmark.ts", viewBox);
