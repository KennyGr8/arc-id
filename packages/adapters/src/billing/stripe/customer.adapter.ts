// packages/adapters/src/billing/stripe/customer.adapter.ts
import { BillingAdapter } from '../types';

export class StripeCustomerAdapter implements BillingAdapter {
  async createCustomer(options: { email: string; name?: string; metadata?: Record<string, any>; }) {
    throw new Error('StripeCustomerAdapter.createCustomer not implemented');
  }

  async getCustomer(customerId: string) {
    throw new Error('StripeCustomerAdapter.getCustomer not implemented');
  }
}
