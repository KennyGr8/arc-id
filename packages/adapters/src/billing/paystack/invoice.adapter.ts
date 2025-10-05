// packages/adapters/src/billing/paystack/invoice.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class PaystackInvoiceAdapter implements BillingAdapter {
  private baseUrl = 'https://api.paystack.co';

  async createInvoice(options: { customerId: string; items: Array<{ description: string; amount: number }> }) {
    const response = await axios.post(
      `${this.baseUrl}/invoice`,
      {
        customer: options.customerId,
        line_items: options.items.map(i => ({ name: i.description, amount: i.amount })),
      },
      { headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` } }
    );
    return response.data;
  }

  async getInvoice(invoiceId: string) {
    const response = await axios.get(`${this.baseUrl}/invoice/${invoiceId}`, {
      headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` },
    });
    return response.data;
  }
}
