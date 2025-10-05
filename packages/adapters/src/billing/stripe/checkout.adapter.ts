// packages/adapters/src/billing/stripe/checkout.adapter.ts
import Stripe from 'stripe'
import { BillingAdapter } from '../index'
import { config } from '@arc-id/common'

export class StripeCheckoutAdapter implements BillingAdapter {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(config.BILLING.STRIPE.SECRET_KEY! as string)
  }

  async createPayment(options: {
    amount: number
    currency: string
    customerEmail?: string
  }) {
    return this.stripe.paymentIntents.create({
      amount: options.amount,
      currency: options.currency,
      receipt_email: options.customerEmail,
    })
  }
}
