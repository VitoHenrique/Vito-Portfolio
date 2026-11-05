# DECISOES.md

Registro de decisões, suposições e funções novas do site 2026 da vito.dev.
Fonte do plano: `_briefing/BRIEFING.md` (fora do Git).

## Fase 0: preparar (04/11/2026)

### Origem do site no ar (pergunta 6 do briefing)

- O projeto Vercel `vito-dev` (`prj_99KP1QM9tFrelYzpNvqJh8jeAgU9`) está ligado ao repositório `VitoHenrique/Vito-Portfolio`.
- A produção atual (`dpl_4WViunHfkYKZeXBuzhntwbdrZVWu`, 03/12/2025) foi publicada **pela linha de comando** (`source: cli`), a partir de uma pasta local que tinha alterações sem commit. Por isso o site no ar tem planos, FAQ e "Contrato de Performance", e o `main` do GitHub não tem.
- **Decisão:** usar o `Vito-Portfolio`, na branch `site-2026`. O site é refeito do zero, então o código não commitado não faz falta: preços, planos e FAQ vêm de `planos.json` e do briefing. Push na branch gera só Preview, nunca produção.
- Domínio próprio: fica para depois do Portão 2, com o OK do Vito.

### Segurança: produção vulnerável

- A produção roda `next@16.0.6`, versão afetada pela falha crítica de execução remota em React Server Components (React2Shell, CVE-2025-55182, dezembro de 2025).
- A Vercel abriu a correção na branch `vercel/nextjsreact-flight-rce-advisor-kcbfkg` (10/12/2025), mas ela nunca foi mesclada nem publicada em produção.
- O site novo nasce com Next.js atualizado.
- **Corrigido em produção em 04/11/2026, com o OK do Vito:**
  - O código da produção foi recuperado da própria Vercel (fonte do deploy CLI) e commitado no `main` (`7635243`). Agora o `main` é igual ao que está no ar.
  - `next` 16.0.6 → 16.4.5, `react` e `react-dom` 19.2.0 → 19.2.9, mais `npm audit fix`. Resultado do `npm audit`: 0 vulnerabilidades.
  - O preview foi comparado com a produção antiga: o texto ficou idêntico, só o ano do rodapé mudou (é gerado no build).
  - Produção nova: `dpl_5pBEqLtc99gfzK3JVFxB1HVsAenU`, publicada pelo Git a partir do `main` (`49d57f0`). Planos, FAQ e links de WhatsApp foram conferidos no ar.
  - **Rollback:** promover `dpl_4WViunHfkYKZeXBuzhntwbdrZVWu` na Vercel.
  - O erro de hidratação do React (#418) no console já existia na versão antiga. Fica sem correção, porque o site é refeito na `site-2026`.
- **Daqui em diante:** todo push no `main` publica em produção. O trabalho do site novo fica na `site-2026` e só entra no `main` depois do Portão 2.

### Linha de base de desempenho (site no ar)

O PageSpeed Insights sem chave respondeu 429 (cota esgotada). A medição foi feita com Lighthouse 12.8.2 local, que é o mesmo motor.

| Medida | Celular | Desktop |
| --- | --- | --- |
| Desempenho | 61 | 92 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 96 | 96 |
| SEO | 100 | 100 |
| FCP | 4,8 s | 1,0 s |
| LCP | 8,7 s | 1,6 s |
| TBT | 40 ms | 0 ms |
| CLS | 0 | 0,041 |
| JavaScript do site | ~353 KB em 9 arquivos | igual |

- **Ressalva:** o antivírus desta máquina (Kaspersky) injeta cerca de 836 KB de script e CSS na página, e isso piora os números do celular. O JavaScript do próprio site (~353 KB) confere com os 352 KB do briefing. O elemento de LCP é o H1, que entra com `blur` e opacidade do Framer Motion.
- Antes do Portão 1, repetir a medição pelo PageSpeed Insights com chave de API, ou num navegador sem o antivírus.

### Ferramentas

- `pnpm` não está instalado. Uso `npm`, que o repositório já usa. O `pnpm qa` do briefing vale para o repositório `REMOTION-VIDEOS`, não para este.
- As skills de GSAP (`/plugin marketplace add greensock/gsap-skills`) só instalam por um terminal `claude`. O Vito instala, ou eu sigo a documentação oficial do GSAP.
- Skills do Remotion instaladas com `npx skills add remotion-dev/skills` (13 skills, versão 4.0.540) em `.claude/skills/`. O alerta de risco da `remotion-docs` vem da chave pública de busca Algolia da documentação do Remotion, que é aberta por padrão. Revisado e mantido. As pastas das skills ficam fora do Git (caminhos longos demais no Windows); o `skills-lock.json` versionado permite reinstalar.

## Fase 1: fundação (04/11/2026)

### O que entrou

- **Limpeza:** saíram todos os componentes antigos e as bibliotecas Framer Motion, Three.js, lucide-react, react-icons, clsx e tailwind-merge. Também saíram os PNGs do logo antigo e os SVGs de exemplo do Next.
- **Tokens:** `globals.css` com `@theme` do Tailwind 4 gerado do `tokens.json`. A paleta, as fontes, as sombras e os blurs padrão do Tailwind foram desligados (`--color-*: initial` etc.): escrever `bg-blue-500`, `blur` ou `shadow` não gera CSS.
- **Fontes:** `next/font/local` com os dois `.woff2` do pacote. Epilogue pré-carregada, Martian Mono sem pré-carga (só rótulos).
- **Logos:** os 6 SVGs oficiais em `public/marca/`, usados por `<Logo>` sempre como arquivo, nunca redigitados.
- **Ícones:** `icon.svg` = símbolo oficial sobre o quadrado Grafite. `apple-icon.png` (180), `icone-192/512.png` e `vito-dev-icone.png` (redondo, para a assinatura de e-mail) gerados por `npm run icones`.
- **Compartilhamento:** `opengraph-image.png` e `twitter-image.png` = `aplicacoes/site-compartilhamento.png` (1200 × 630, sem cidade, sem @).
- **Componentes:** `Botao`/`BotaoWhatsApp`, `Card`, `TituloDuasVozes`, `Rotulo`/`Numero`, `ListaMarcada`/`Marcador`/`Losango`, `Logo`, `Celular`.
- **Regras com teste (Vitest, 15 testes):** `precos.ts` (formato R$, total em 12 meses a partir do `planos.json`) e `whatsapp.ts` (as 5 mensagens do briefing, limpeza do nome do negócio em 32 caracteres).
- **Movimento:** `curvas.ts` (tokens), `gsap.ts` (registro), `plugins.ts` (carga sob demanda), `usarCena.ts` (`useCena` com os 3 ramos do `matchMedia`), `assinatura.ts` (carimbo, máscara, duasVozes), `Ponto.tsx`, `Filme.tsx` e `Rolagem.tsx` (Lenis).
- **`/lab`:** bancada sem indexação (`noindex, nofollow`) com cores, tipos, botões, cards, logos, celular, tokens de movimento tocáveis e o Ponto viajando entre 3 âncoras.
- **Home provisória:** H1 real "Seu site no ar. Ponto." e botão de WhatsApp, só para o preview não ficar vazio. As cenas entram na Fase 2.

### Decisões de implementação

- **Plugins do GSAP em duas camadas.** O briefing pede registro único em `motion/gsap.ts`. Registrar os 10 plugins de uma vez custa uns 90 KB comprimidos na abertura, o que estoura a meta de 170 KB. O núcleo (gsap, useGSAP, ScrollTrigger, SplitText, CustomEase) fica em `gsap.ts`. Flip, DrawSVG, MorphSVG, MotionPath, Draggable e Inertia entram por `carregarPlugins()` quando a cena se aproxima. O único ponto de registro continua sendo `gsap.ts` (`registrar()`).
- **Como o Ponto funciona.** Cada cena tem uma `<AncoraPonto>`, que já é um círculo Verde Lima no HTML. Sem JS, ou com movimento reduzido, cada cena mostra o seu grafismo estático. Com movimento, a classe `ponto-vivo` esconde as âncoras e o Ponto fixo assume: viaja para a âncora da cena ativa (curva `entrada`, 0,7 s), depois fica preso a ela durante o scroll e carimba se a âncora pedir. A posição é calculada a cada quadro a partir da âncora, então redimensionar a tela não exige recálculo.
- **O Ponto é desenhado com 1000 px e reduzido com `scale`,** para a borda ficar nítida em qualquer tamanho.
- **Hook `useCena`.** O arquivo segue o nome do briefing (`usarCena.ts`), mas a função precisa começar com `use` por causa das regras de hooks do React.
- **Origem do WhatsApp.** As mensagens seguem o texto do briefing, sem etiqueta de seção no meio, para soar natural. A origem do clique vai no atributo `data-origem` do botão, que alimenta o evento `whatsapp_click`.
- **Botão.** O hover usa só a propriedade CSS `translate`. O GSAP anima `transform`, então os dois nunca disputam a mesma propriedade.
- **GSAP 3.15.0, não 3.15.1.** A 3.15.1 saiu em 04/11/2026, um dia antes. Atualizo quando ela tiver duas semanas.
- **Vitest 4.1.12.** A 5.x exige `@types/node` 22+, e o projeto está em Node 20.

### Meta de 170 KB: motor de animação fora do caminho crítico

- Com o GSAP direto no bundle, a home carregava 188 KB no preview (brotli). React e Next sozinhos somam ~125 KB, e o núcleo GSAP + ScrollTrigger, mesmo enxuto, tem 46 KB.
- **Decisão:** o HTML e o React hidratam sem o GSAP. `motion/Motor.tsx` carrega Ponto, Filme e Rolagem (e, na Fase 2, as ilhas de cada cena) por `next/dynamic` com `ssr: false`, logo depois da hidratação.
- Não se perde nada visível: o H1 está no primeiro quadro, cada âncora já é o Ponto estático no HTML, e o Ponto viajante nasce exatamente sobre ela.
- SplitText e CustomEase saíram do núcleo. SplitText carrega sob demanda, e as curvas da marca viraram uma função `bezier()` testada.

### Medidas da Fase 1 (preview da Vercel, brotli)

| Medida | Valor | Meta |
| --- | --- | --- |
| JavaScript no HTML da home | 137 KB em 6 arquivos | até 170 KB |
| Motor de animação, depois da hidratação | 47 KB em 2 arquivos | fora da abertura |
| JavaScript no HTML do `/lab` | 184 KB | não conta (página interna, importa o GSAP direto) |

- `/lab` sai com `noindex, nofollow`. Canonical, `og:image` e `icon.svg` aparecem no HTML.
- Fontes: só a Epilogue (35 KB) carrega na abertura.
- Console sem erros. O Ponto viaja entre as âncoras do `/lab`, e o contador de cena funciona.
- Busca por itens aposentados (cores antigas, Inter, JetBrains, "Code never lies.", cidade, `@vito.dev`, npx, gradiente, glow, blur, stack, "agência", travessão em texto visível): nada no código do site.

### Padrões assumidos enquanto o Vito não responde

| # | Pergunta | Padrão em uso |
| --- | --- | --- |
| 1 | Garantia "Saiu do ar? Você não paga." | Atrás da chave `mostrarGarantia`, desligada. Fora da simulação do Instagram |
| 2 | Social media | "Peças para redes", sem prometer gestão de perfil |
| 3 | Trabalhos reais | Seção de casos não renderiza enquanto `casos.ts` estiver vazio |
| 4 | Padaria Sol | Rótulo "Projeto demonstrativo" |
| 5 | Título acima de 112 px | Até 112 px só no herói e no fecho, demais em 56 px |
| 6 | Repositório e domínio | `Vito-Portfolio`, branch `site-2026`. Domínio depois |
| 7 | Tamanho da equipe | Até 3 pessoas (licença gratuita do Remotion) |
