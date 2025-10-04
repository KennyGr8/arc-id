// packages/adapters/src/billing/paystack/customer.adapter.ts
import { BillingAdapter } from '../types';

export class PaystackCustomerAdapter implements BillingAdapter {
  async createCustomer(options: { email: string; name?: string; metadata?: Record<string, any>; }) {
    throw new Error('PaystackCustomerAdapter.createCustomer not implemented');
  }

  async getCustomer(customerId: string) {
    throw new Error('PaystackCustomerAdapter.getCustomer not implemented');
  }
}
