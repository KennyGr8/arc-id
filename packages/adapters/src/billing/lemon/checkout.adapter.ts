// packages/adapters/src/billing/lemon/checkout.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class LemonCheckoutAdapter implements BillingAdapter {
  private baseUrl = 'https://api.lemonsqueezy.com/v1';

  async createPayment(options: { amount: number; currency: string; customerEmail?: string }) {
    const response = await axios.post(
      `${this.baseUrl}/checkout_sessions`,
      {
        amount: options.amount,
        currency: options.currency,
        customer_email: options.customerEmail,
      },
      { headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` } }
    );
    return response.data;
  }
}
