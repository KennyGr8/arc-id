// packages/adapters/src/billing/stripe/subscription.adapter.ts
import Stripe from 'stripe';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class StripeSubscriptionAdapter implements BillingAdapter {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.BILLING.STRIPE.SECRET_KEY! as string, {
      apiVersion: '2022-11-15' as any, // safe cast
    });
  }

  async createSubscription(options: { customerId: string; planId: string; trialPeriodDays?: number }) {
    return this.stripe.subscriptions.create({
      customer: options.customerId,
      items: [{ price: options.planId }],
      trial_period_days: options.trialPeriodDays,
    });
  }

  async cancelSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }
}
