// packages/adapters/src/billing/paystack/checkout.adapter.ts
import { BillingAdapter } from '../types';

export class PaystackCheckoutAdapter implements BillingAdapter {
  async createPayment(options: { amount: number; currency: string; customerEmail?: string; metadata?: Record<string, any>; }) {
    throw new Error('PaystackCheckoutAdapter.createPayment not implemented');
  }
}
