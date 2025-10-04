// packages/adapters/src/billing/lemon/webhook.adapter.ts
import { BillingAdapter } from '../types';

export class LemonWebhookAdapter implements BillingAdapter {
  async handleWebhook(payload: any, signature: string) {
    throw new Error('LemonWebhookAdapter.handleWebhook not implemented');
  }
}
