// packages/adapters/src/billing/lemon/invoice.adapter.ts
import { BillingAdapter } from '../types';

export class LemonInvoiceAdapter implements BillingAdapter {
  async createInvoice(options: { customerId: string; items: Array<{ description: string; amount: number; quantity?: number }>; metadata?: Record<string, any>; }) {
    throw new Error('LemonInvoiceAdapter.createInvoice not implemented');
  }

  async getInvoice(invoiceId: string) {
    throw new Error('LemonInvoiceAdapter.getInvoice not implemented');
  }
}
