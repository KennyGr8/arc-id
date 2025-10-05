// packages/adapters/src/billing/paystack/checkout.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class PaystackCheckoutAdapter implements BillingAdapter {
  private baseUrl = 'https://api.paystack.co';

  async createPayment(options: { amount: number; currency: string; customerEmail?: string }) {
    const response = await axios.post(
      `${this.baseUrl}/transaction/initialize`,
      {
        amount: options.amount * 100, // Paystack expects kobo
        email: options.customerEmail,
        currency: options.currency,
        callback_url: config.BILLING.PAYSTACK.CALLBACK_URL,
      },
      { headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` } }
    );
    return response.data;
  }
}
