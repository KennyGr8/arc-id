// packages/adapters/src/billing/paystack/subscription.adapter.ts
import { BillingAdapter } from '../types';

export class PaystackSubscriptionAdapter implements BillingAdapter {
  async createSubscription(options: { customerId: string; planId: string; metadata?: Record<string, any>; }) {
    throw new Error('PaystackSubscriptionAdapter.createSubscription not implemented');
  }

  async cancelSubscription(subscriptionId: string) {
    throw new Error('PaystackSubscriptionAdapter.cancelSubscription not implemented');
  }
}
