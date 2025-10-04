// packages/adapters/src/billing/stripe/webhook.adapter.ts
import { BillingAdapter } from '../types';

export class StripeWebhookAdapter implements BillingAdapter {
  async handleWebhook(payload: any, signature: string) {
    throw new Error('StripeWebhookAdapter.handleWebhook not implemented');
  }
}
