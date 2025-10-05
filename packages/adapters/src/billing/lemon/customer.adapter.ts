// packages/adapters/src/billing/lemon/customer.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class LemonCustomerAdapter implements BillingAdapter {
  private baseUrl = 'https://api.lemonsqueezy.com/v1';

  async createCustomer(options: { email: string; name?: string }) {
    const response = await axios.post(
      `${this.baseUrl}/customers`,
      { email: options.email, name: options.name },
      { headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` } }
    );
    return response.data;
  }

  async getCustomer(customerId: string) {
    const response = await axios.get(`${this.baseUrl}/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${config.BILLING.LEMON.API_KEY}` },
    });
    return response.data;
  }
}
