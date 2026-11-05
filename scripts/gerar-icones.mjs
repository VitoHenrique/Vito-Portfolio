// Gera os ícones PNG a partir do símbolo oficial (src/app/icon.svg).
// Uso: node scripts/gerar-icones.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile(new URL("../src/app/icon.svg", import.meta.url));

const saidas = [
  ["src/app/apple-icon.png", 180],
  ["public/marca/icone-192.png", 192],
  ["public/marca/icone-512.png", 512],
];

for (const [arquivo, lado] of saidas) {
  await sharp(svg, { density: 600 }).resize(lado, lado).png().toFile(arquivo);
  console.log(arquivo, lado);
}

// Ícone redondo da assinatura de e-mail (pendência do vito-dev-contexto.md).
const lado = 192;
const mascara = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}"><circle cx="${lado / 2}" cy="${lado / 2}" r="${lado / 2}"/></svg>`,
);
await sharp(svg, { density: 600 })
  .resize(lado, lado)
  .composite([{ input: mascara, blend: "dest-in" }])
  .png()
  .toFile("public/marca/vito-dev-icone.png");
console.log("public/marca/vito-dev-icone.png", lado);
