import type { MetadataRoute } from "next";
import { marca } from "@/conteudo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: marca.nome,
    short_name: marca.nome,
    description: marca.descricao,
    start_url: "/",
    display: "browser",
    background_color: "#0e0f0c",
    theme_color: "#0e0f0c",
    lang: "pt-BR",
    icons: [
      { src: "/marca/icone-192.png", sizes: "192x192", type: "image/png" },
      { src: "/marca/icone-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
