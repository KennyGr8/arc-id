// packages/adapters/src/billing/paystack/customer.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class PaystackCustomerAdapter implements BillingAdapter {
  private baseUrl = 'https://api.paystack.co';

  async createCustomer(options: { email: string; name?: string }) {
    const response = await axios.post(
      `${this.baseUrl}/customer`,
      { email: options.email, name: options.name },
      { headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` } }
    );
    return response.data;
  }

  async getCustomer(customerId: string) {
    const response = await axios.get(`${this.baseUrl}/customer/${customerId}`, {
      headers: { Authorization: `Bearer ${config.BILLING.PAYSTACK.SECRET_KEY}` },
    });
    return response.data;
  }
}
