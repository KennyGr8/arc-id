// packages/adapters/src/billing/lemon/customer.adapter.ts
import { BillingAdapter } from '../types';

export class LemonCustomerAdapter implements BillingAdapter {
  async createCustomer(options: { email: string; name?: string; metadata?: Record<string, any>; }) {
    throw new Error('LemonCustomerAdapter.createCustomer not implemented');
  }

  async getCustomer(customerId: string) {
    throw new Error('LemonCustomerAdapter.getCustomer not implemented');
  }
}
