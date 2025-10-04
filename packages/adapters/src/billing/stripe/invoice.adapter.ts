// packages/adapters/src/billing/stripe/invoice.adapter.ts
import { BillingAdapter } from '../types';

export class StripeInvoiceAdapter implements BillingAdapter {
  async createInvoice(options: { customerId: string; items: Array<{ description: string; amount: number; quantity?: number }>; metadata?: Record<string, any>; }) {
    throw new Error('StripeInvoiceAdapter.createInvoice not implemented');
  }

  async getInvoice(invoiceId: string) {
    throw new Error('StripeInvoiceAdapter.getInvoice not implemented');
  }
}
