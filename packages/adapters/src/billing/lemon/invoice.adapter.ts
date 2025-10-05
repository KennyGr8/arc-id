// packages/adapters/src/billing/lemon/invoice.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class LemonInvoiceAdapter implements BillingAdapter {
  private baseUrl = 'https://api.lemonsqueezy.com/v1';

  async createInvoice(options: { customerId: string; items: Array<{ description: string; amount: number }> }) {
    const response = await axios.post(
      `${this.baseUrl}/invoices`,
      {
        customer_id: options.customerId,
        line_items: options.items.map(i => ({ name: i.description, amount: i.amount })),
      },
      { headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` } }
    );
    return response.data;
  }

  async getInvoice(invoiceId: string) {
    const response = await axios.get(`${this.baseUrl}/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` },
    });
    return response.data;
  }
}
