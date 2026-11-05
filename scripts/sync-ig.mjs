// sync:ig · copia o conteúdo real do @vitodev.oficial para o site.
//
// Lê o repositório VitoHenrique/vitodev-instagram (clonado localmente, com os
// posts já renderizados pelo pipeline dele em saida/), e gera:
//   public/ig/...            imagens em AVIF e WebP (nada de media_url nem token)
//   src/conteudo/instagram.json
// Regras: só o que já foi publicado; a garantia NUNCA entra (decisão do Vito).
//
// Uso: npm run sync:ig -- <caminho-do-repo-vitodev-instagram>
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ig = path.resolve(process.argv[2] ?? "../vitodev-instagram");
const raiz = path.resolve(import.meta.dirname, "..");
const destino = path.join(raiz, "public", "ig");
const ler = async (p) => JSON.parse(await fs.readFile(path.join(ig, p), "utf8"));

await fs.rm(destino, { recursive: true, force: true });
await fs.mkdir(destino, { recursive: true });

async function converter(origem, nome, largura) {
  const base = path.join(destino, nome);
  await fs.mkdir(path.dirname(base), { recursive: true });
  const img = sharp(path.join(ig, origem)).resize({ width: largura, withoutEnlargement: true });
  await img.clone().avif({ quality: 52 }).toFile(`${base}.avif`);
  await img.clone().webp({ quality: 76 }).toFile(`${base}.webp`);
  return `/ig/${nome}`;
}

// Posts publicados (estado/publicados.json), com os slides renderizados em saida/.
const publicados = await ler("estado/publicados.json");
const renderizados = await ler("saida/posts.json");
const conteudo = (
  await Promise.all(
    (await fs.readdir(path.join(ig, "conteudo"))).filter((f) => f.endsWith(".json")).map((f) => ler(`conteudo/${f}`)),
  )
).flatMap((m) => m.posts);

const posts = [];
for (const r of renderizados) {
  if (publicados[r.id]?.status !== "publicado") continue;
  const fonte = conteudo.find((p) => p.id === r.id);
  const slides = [];
  for (const s of r.slides) slides.push(await converter(`saida/${r.id}/${s}`, `posts/${r.id}/${path.parse(s).name}`, 720));
  posts.push({
    id: r.id,
    permalink: publicados[r.id].permalink,
    publicadoEm: publicados[r.id].em,
    formato: fonte?.formato ?? r.formato,
    estilo: fonte?.slides?.[0]?.estilo ?? "cartao",
    legenda: fonte?.legenda ?? "",
    slides,
  });
}

// Destaques: capa + stories. A garantia fica de fora, sempre.
const destaquesDef = [
  { id: "planos", nome: "planos", capa: "marca/destaques/1-planos.png", stories: ["stories/destaques/01-planos.jpg", "1-planos"] },
  { id: "sites", nome: "sites", capa: "marca/destaques/2-servicos.png", stories: ["stories/destaques/02-sites.jpg", "2-servicos"] },
  { id: "rapido", nome: "rápido", capa: "marca/destaques/3-rapido.png", stories: ["stories/destaques/03-velocidade.jpg", "3-rapido"] },
  { id: "oi", nome: "oi", capa: "marca/destaques/5-contato.png", stories: ["stories/destaques/05-contato.jpg", "5-contato"] },
];
const conteudoStories = await fs.readdir(path.join(ig, "stories", "destaques-conteudo"));
const destaques = [];
for (const d of destaquesDef) {
  const [primeiro, prefixo] = d.stories;
  const arquivos = [primeiro, ...conteudoStories.filter((f) => f.startsWith(`${prefixo}-`)).sort().map((f) => `stories/destaques-conteudo/${f}`)];
  if (arquivos.some((a) => /garantia/i.test(a))) throw new Error("A garantia não pode entrar na simulação do Instagram.");
  const stories = [];
  for (const [i, a] of arquivos.entries()) stories.push(await converter(a, `stories/${d.id}/${String(i + 1).padStart(2, "0")}`, 540));
  destaques.push({ id: d.id, nome: d.nome, capa: await converter(d.capa, `destaques/${d.id}`, 192), stories });
}

// Reels: só os que já passaram da hora marcada; o site confere a data na hora de mostrar.
const fila = await ler("reels/fila.json");
const reels = fila.reels.map((r) => ({ id: r.id, quando: r.quando, legenda: r.legenda, video: "/video/3-logos-1-empresa.mp4" }));

const saida = {
  _gerado: "por scripts/sync-ig.mjs a partir do repositório vitodev-instagram. Não edite à mão.",
  sincronizadoEm: new Date().toISOString(),
  perfil: { usuario: "vitodev.oficial", link: "https://instagram.com/vitodev.oficial" },
  linhaFixada: posts.filter((p) => p.estilo === "tipografico").map((p) => p.id),
  posts,
  destaques,
  reels,
};
await fs.writeFile(path.join(raiz, "src", "conteudo", "instagram.json"), JSON.stringify(saida, null, 2) + "\n");
console.log(`posts: ${posts.length} · destaques: ${destaques.length} · reels na fila: ${reels.length}`);
