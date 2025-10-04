// packages/adapters/src/billing/types.ts
export interface BillingAdapter {
  createPayment?(options: {
    amount: number;
    currency: string;
    customerEmail?: string;
    metadata?: Record<string, any>;
  }): Promise<any>;

  createSubscription?(options: {
    customerId: string;
    planId: string;
    trialPeriodDays?: number;
    metadata?: Record<string, any>;
  }): Promise<any>;

  cancelSubscription?(subscriptionId: string): Promise<any>;

  createInvoice?(options: {
    customerId: string;
    items: Array<{ description: string; amount: number; quantity?: number }>;
    metadata?: Record<string, any>;
  }): Promise<any>;

  getInvoice?(invoiceId: string): Promise<any>;

  createCustomer?(options: {
    email: string;
    name?: string;
    metadata?: Record<string, any>;
  }): Promise<any>;

  getCustomer?(customerId: string): Promise<any>;

  handleWebhook?(payload: any, signature: string): Promise<any>;
}
