// packages/adapters/src/billing/paystack/subscription.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class PaystackSubscriptionAdapter implements BillingAdapter {
  private baseUrl = 'https://api.paystack.co';

  async createSubscription(options: { customerId: string; planId: string }) {
    const response = await axios.post(
      `${this.baseUrl}/subscription`,
      {
        customer: options.customerId,
        plan: options.planId,
      },
      {
        headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` },
      }
    );
    return response.data;
  }

  async cancelSubscription(subscriptionId: string) {
    const response = await axios.post(
      `${this.baseUrl}/subscription/disable`,
      { code: subscriptionId },
      { headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` } }
    );
    return response.data;
  }
}
