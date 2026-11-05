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

## Fase 2: fatia vertical (04/11/2026)

### O que entrou

- **Cena 0 · Carimbo.** `vito` entra, `dev` responde e o ponto carimba em ~0,63 s. Depois o Ponto viajante sai do ponto do logo e cresce até o canto do herói. Isso só acontece na primeira visita da sessão e sem movimento reduzido, e qualquer scroll, toque, clique ou tecla pula na hora. Um script inline no `<head>` decide antes da primeira pintura. Se o motor não assumir em 2,5 s, a página aparece normal.
- **O wordmark animável** usa os caminhos do SVG oficial (`npm run logo` gera `src/marca/wordmark.ts`), sem redigitar o logo.
- **Cena 1 · Herói.** H1 no primeiro quadro, Ponto cortado no canto superior direito que se inclina com o ponteiro no desktop, e medidor real `ESTA PÁGINA ABRIU EM X S` a partir do LCP do aparelho. Acima de 3 s, ou sem a API (Safari, Firefox), o medidor não aparece.
- **Cena 8 · Vídeos.**
  - O Ponto pousa no centro e a sala abre como íris (pin de 120 vh no desktop, por tempo no celular).
  - Reel nativo com `preload="none"`, pôster AVIF de 8 KB, legenda `.vtt` e botão de som. Ele toca mudo só quando está na tela.
  - Mesa com 7 efeitos reais do Remotion: miniatura parada e Player só no card ativo.
  - Linha do tempo com régua que controla `seekTo`, 5 camadas que acendem e descrição em `aria-live`.
  - "Sua marca em movimento" com nome, cor e formato via `inputProps`, e WhatsApp com o nome do negócio.
  - Todo o Remotion só carrega a ~1 tela de distância.
- **Planos (cena 9)** em versão estática, para o menu e o atalho funcionarem. A tela verde entra na Fase 3.
- **Rodapé** e **WhatsApp flutuante**.

### Decisões

- **Legenda do reel:** o `.vtt` foi transcrito da legenda já gravada na imagem (quadros a cada 0,5 s), sem inventar texto.
- **Formato 16:9 / 9:16 do embed principal:** o reel só existe em 9:16. A troca de formato entra com o showreel (Fase 5). Por enquanto, a vinheta editável já troca entre 9:16, 1:1 e 16:9.
- **"Publicado":** antes de 06/11 18h o rótulo diz "Reel da vito.dev · 31 s". Depois, a home (revalidada a cada hora) passa a dizer "Reel publicado no Instagram" e mostra o link.
- **Padaria Sol:** rótulo "projeto demonstrativo" (padrão da pergunta 4).
- **Cores da vinheta:** as 5 sugestões (azul, laranja, rosa, amarelo, Giz) e o seletor livre são a cor da marca do visitante. Elas só existem dentro da vinheta, como pede o briefing.
- **Contador de cena:** fica em pé na borda esquerda para não cobrir conteúdo, e sai do celular, onde não há margem livre.
- **WhatsApp flutuante:** só do tablet para cima. No celular, o cabeçalho fixo já tem o botão, e o flutuante cobria o texto.
- **Íris por variável CSS (`--iris`):** o GSAP pulava de 0 para 75% ao interpolar a string do `clip-path`. Com um número, a abertura fica contínua.
- **Recalcular posições:** um ResizeObserver no `body` chama `ScrollTrigger.refresh()` quando ilhas tardias (a sala) mudam a altura da página.
- **Remotion 4.0.537**, a mesma versão da central de vídeos, com todos os pacotes na versão exata. Licença gratuita assumida para até 3 pessoas (`acknowledgeRemotionLicense`).
- **Peso vivo (ideia do briefing):** fica de fora por enquanto. Animar `font-weight` mexe em layout e pintura, e a regra do GSAP é animar só transform, opacity e clip-path. Fica para avaliar no Portão 1.

### QA e desempenho (Portão 1)

- **Playwright** (`scripts/qa-portao.mjs`): gravações em 1440 e 390 px e prints em 390, 768 e 1440 px, com e sem movimento reduzido. Nenhum erro de console, nenhuma rolagem lateral, e o botão principal fica visível sem rolar em todas as larguras. Com movimento reduzido, o Ponto fica estático (sem `ponto-vivo`).
- **PageSpeed Insights oficial (celular, pela interface web, sem chave):**

| Medida | Site atual | Site novo (preview) |
| --- | --- | --- |
| Desempenho | 88 | **99** |
| FCP | 2,0 s | 1,5 s |
| LCP | 3,3 s | 1,5 s |
| TBT | 90 ms | 20 ms |
| CLS | 0 | 0 |

- O Lighthouse local fica distorcido pelo antivírus (ele descomprime e reescreve as páginas). `scripts/medir.ps1` bloqueia os arquivos injetados, mas os números oficiais são os do PageSpeed acima.
- O SEO do preview aparece como 66 no Lighthouse local por causa do `noindex` que a Vercel põe em todo preview. No PageSpeed oficial deu 100.

## Portão 1 (05/11/2026)

- O Vito pediu "só o preview" (nada em produção) e depois "continue o projeto". Tomei isso como aprovação da direção da fatia vertical. As três perguntas do portão (garantia, Padaria Sol, chave do PageSpeed) seguem abertas, com os padrões da tabela.

## Fase 3: home completa (05/11/2026)

### As 12 cenas

| # | Cena | O que entrou |
| --- | --- | --- |
| 0 | Carimbo | Da Fase 2 |
| 1 | Herói | Da Fase 2 |
| 2 | A corrida | Dois celulares, lento (Coral, 5,0 s) e rápido (Lima). O rápido usa o LCP real desta página no aparelho do visitante; sem a API, 1,0 s. Rótulo `SIMULAÇÃO`. No celular, um aparelho por vez. O Ponto pousa ao lado e vira o cronômetro |
| 3 | Quatro ofícios | Lista dos 4 serviços com preço público só onde existe. Um objeto único muda de forma (navegador, painel, símbolo, quadro de vídeo) com corte seco. Cada item leva à cena do serviço. Menu ganhou "Serviços" |
| 4 | Sites: monte o seu | Nome + tipo (barbearia, clínica, delivery, escritório, loja) e o site monta no celular. `PRÉVIA · DADOS DE EXEMPLO`. WhatsApp com a mensagem de prévia |
| 5 | Sistemas | Planilha (com erros em Coral), login e painel. No desktop: pin de 200 vh, as células voam até os blocos do painel. Celular e movimento reduzido: três quadros lado a lado. ADMIN / FUNCIONÁRIO só com CSS (`:has`). `DADOS DE EXEMPLO` |
| 6 | Identidade visual | Anatomia do símbolo com as 4 medidas do manual (geometria do SVG oficial), antes e depois com quadros reais do reel, aplicações reais (perfil, capa do WhatsApp, cartão com giro 3D, proposta, favicon) com Flip sob demanda, e "o que vem no pacote" |
| 7 | Instagram | Perfil funcional no celular com o conteúdo real: 5 posts publicados (2 carrosséis), 4 destaques com stories (planos, sites, rápido, oi), aba Reels (o reel aparece a partir de 06/11 18h). Post em tela cheia com carrossel, legenda real e link para o post original. Grade com a linha tipográfica fixada no topo, e o hover explica a metodologia de cada linha |
| 8 | Vídeos | Da Fase 2 |
| 9 | Planos | A tela verde: uma vez só, menos de uma altura de tela, texto e ponto em Grafite, e o cabeçalho (com o logo) sai de cena. Depois, os cards |
| 10 | Como funciona e Vito | A linha desenha as 4 etapas com o scroll (só `scaleX`/`scaleY`) e termina no retrato do Vito. Em seguida, uma conversa `SIMULAÇÃO` com as mensagens reais do WhatsApp Business |
| 11 | Perguntas e fecho | As 8 perguntas do briefing, reescritas na primeira pessoa, em `<details>` (teclado e sem JS). No fecho, o Ponto encolhe e pousa exatamente sobre o ponto final de "Seu site no ar. Ponto." |

### Instagram: `npm run sync:ig`

- `scripts/sync-ig.mjs` lê o repositório `vitodev-instagram` clonado e gera `public/ig/` (AVIF + WebP, 815 KB, carregados só perto da cena) e `src/conteudo/instagram.json`.
- Os posts são renderizados pelo próprio pipeline do repositório (`scripts/render.mjs`), só os que estão em `estado/publicados.json`. As imagens dele ficam no Supabase, com URL em segredo, então renderizar é o caminho que não precisa de chave.
- A garantia nunca entra: o sync recusa qualquer arquivo com "garantia".
- **Bio:** a bio real do perfil não está no repositório. Usei a descrição oficial do WhatsApp Business. Trocar pela bio real se for diferente.
- Primeira entrega com sincronização manual. O deploy hook automático fica para depois do lançamento, como o briefing prevê.

### Decisões de implementação

- **Funções que entraram sem perguntar** (passam nas 5 perguntas do briefing): conversa simulada (cena 10), tecla ponto (leva ao fecho, anunciada no menu por teclado), cabeçalho que sai na tela verde.
- **Carrossel do post com scroll-snap nativo, não Draggable:** funciona com toque, teclado (botões) e leitor de tela sem JS extra.
- **Story com avanço automático de 5 s;** com movimento reduzido, só avança com toque.
- **Verso do cartão em HTML,** com o @ correto. O PNG do verso tinha o @ provisório e ficou de fora, como o briefing pede. O QR do verso não entra no site.
- **Peças com o ponto gigante dentro de imagens** (capa do WhatsApp, proposta, posts): são provas do trabalho, não grafismo do site. O único Ponto do site continua sendo um.
- **Símbolo só em perfil, favicon e ícone:** tirei o símbolo que eu tinha posto no meio de uma frase.
- **Rótulo em Mono acima do título:** só na cena de vídeos (1 de 12), dentro do limite de 1 a cada 3.

### Correções de base que valem para o site inteiro

- **Máscaras por variável numérica.** O GSAP pulava do início ao fim ao interpolar a string do `clip-path`. A classe `.revela` lê `--revela` (0 a 1), e é o número que se anima. Vale para títulos, logo, sistemas e a íris (`--iris`).
- **Valores iniciais explícitos (`fromTo`).** Uma variável CSS vazia é lida como 0, e o `invalidateOnRefresh` regravava o início no meio da cena.
- **`pinSpacing: true` explícito.** Dentro de um pai `flex`, o ScrollTrigger desliga o espaço do pin, e a cena seguinte subia por baixo do palco preso.
- **`refreshPriority: -1`** nos gatilhos do Ponto, do contador de cena e das entradas: eles calculam depois dos pins.
- **Grade sem colunas = `minmax(0, 1fr)`** (regra base): a coluna automática crescia até o botão mais largo e abria rolagem lateral no celular.
- **Ponto final dentro da parte leve** do título: ele não cai mais sozinho na linha de baixo.

### QA da Fase 3 (servidor local, Playwright)

- Prints das 12 cenas em 1440 e 390 px, com e sem movimento reduzido: nenhum erro de console e nenhuma rolagem lateral.
- Sequência da cena 5 presa conferida quadro a quadro (planilha, células voando, login, painel).
- Tela verde conferida no desktop e no celular, com o cabeçalho fora de cena.

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
