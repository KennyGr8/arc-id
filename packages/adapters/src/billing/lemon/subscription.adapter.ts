// packages/adapters/src/billing/lemon/subscription.adapter.ts
import { BillingAdapter } from '../types';

export class LemonSubscriptionAdapter implements BillingAdapter {
  async createSubscription(options: { customerId: string; planId: string; metadata?: Record<string, any>; }) {
    throw new Error('LemonSubscriptionAdapter.createSubscription not implemented');
  }

  async cancelSubscription(subscriptionId: string) {
    throw new Error('LemonSubscriptionAdapter.cancelSubscription not implemented');
  }
}
