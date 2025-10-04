// packages/adapters/src/billing/stripe/subscription.adapter.ts
import { BillingAdapter } from '../types';

export class StripeSubscriptionAdapter implements BillingAdapter {
  async createSubscription(options: { customerId: string; planId: string; trialPeriodDays?: number; metadata?: Record<string, any>; }) {
    throw new Error('StripeSubscriptionAdapter.createSubscription not implemented');
  }

  async cancelSubscription(subscriptionId: string) {
    throw new Error('StripeSubscriptionAdapter.cancelSubscription not implemented');
  }
}
