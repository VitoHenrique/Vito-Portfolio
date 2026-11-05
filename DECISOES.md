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
