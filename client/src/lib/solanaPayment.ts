export type PaymentStage = "processing" | "verifying" | "confirmed";

export type PaymentIntent = {
  orderId: string;
  amount: string;
  productName: string;
  storeName: string;
};

export type PaymentResult = {
  status: "confirmed";
  demo: true;
  provider: "solana-pay-demo";
  orderId: string;
  reference: string;
};

/**
 * Adapter isolado para pagamento.
 *
 * Este MVP não envia uma transação para a rede Solana e não afirma que houve
 * liquidação on-chain. A sequência simula o comportamento esperado pela UI
 * e mantém o contrato pronto para trocar o mock por Solana Pay no futuro.
 */
export async function confirmDemoPayment(
  intent: PaymentIntent,
  onStage: (stage: PaymentStage) => void,
): Promise<PaymentResult> {
  onStage("processing");
  await new Promise((resolve) => setTimeout(resolve, 650));
  onStage("verifying");
  await new Promise((resolve) => setTimeout(resolve, 850));
  onStage("confirmed");

  return {
    status: "confirmed",
    demo: true,
    provider: "solana-pay-demo",
    orderId: intent.orderId,
    reference: `demo_${Date.now().toString(36)}`,
  };
}
