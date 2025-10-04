// packages/adapters/src/billing/stripe/checkout.adapter.ts
import { BillingAdapter } from '../types';

export class StripeCheckoutAdapter implements BillingAdapter {
  async createPayment(options: { amount: number; currency: string; customerEmail?: string; metadata?: Record<string, any>; }) {
    throw new Error('StripeCheckoutAdapter.createPayment not implemented');
  }
}
