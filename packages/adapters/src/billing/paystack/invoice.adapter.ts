// packages/adapters/src/billing/paystack/invoice.adapter.ts
import { BillingAdapter } from '../types';

export class PaystackInvoiceAdapter implements BillingAdapter {
  async createInvoice(options: { customerId: string; items: Array<{ description: string; amount: number; quantity?: number }>; metadata?: Record<string, any>; }) {
    throw new Error('PaystackInvoiceAdapter.createInvoice not implemented');
  }

  async getInvoice(invoiceId: string) {
    throw new Error('PaystackInvoiceAdapter.getInvoice not implemented');
  }
}
