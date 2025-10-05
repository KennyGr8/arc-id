// packages/adapters/src/billing/lemon/subscription.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class LemonSubscriptionAdapter implements BillingAdapter {
  private baseUrl = 'https://api.lemonsqueezy.com/v1';

  async createSubscription(options: { customerId: string; planId: string }) {
    const response = await axios.post(
      `${this.baseUrl}/subscriptions`,
      {
        customer_id: options.customerId,
        plan_id: options.planId,
      },
      {
        headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` },
      }
    );
    return response.data;
  }

  async cancelSubscription(subscriptionId: string) {
    const response = await axios.delete(`${this.baseUrl}/subscriptions/${subscriptionId}`, {
      headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` },
    });
    return response.data;
  }
}
