/**
 * Chaves de conteúdo. Cada uma é uma decisão do Vito (ver DECISOES.md).
 * Mudar aqui liga ou desliga a peça no site inteiro.
 */
export const flags = {
  /** "Saiu do ar? Você não paga." Desligada até o Vito confirmar o contrato. Nunca entra na simulação do Instagram. */
  mostrarGarantia: false,
  /** Reel "3 logos, 1 empresa" só aparece como publicado a partir de 06/11/2026. */
  reelPublicadoEm: "2026-11-06",
} as const;
