// packages/adapters/src/billing/stripe/customer.adapter.ts
import Stripe from 'stripe'
import { BillingAdapter } from '../index'
import { config } from '@arc-id/common'

export class StripeCustomerAdapter implements BillingAdapter {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(config.BILLING.STRIPE.SECRET_KEY! as string)
  }

  async createCustomer(options: {
    email: string
    name?: string
    metadata?: Record<string, any>
  }) {
    return this.stripe.customers.create({
      email: options.email,
      name: options.name,
      metadata: options.metadata,
    })
  }

  async getCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId)
  }
}
