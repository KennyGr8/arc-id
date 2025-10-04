// packages/adapters/src/billing/lemon/checkout.adapter.ts
import { BillingAdapter } from '../types';

export class PaystackWebhookAdapter implements BillingAdapter {
  async createPayment(options: { amount: number; currency: string; customerEmail?: string; metadata?: Record<string, any>; }) {
    throw new Error('PaystackWebhookAdapter.createPayment not implemented');
  }
}
