// packages/adapters/src/billing/stripe/webhook.adapter.ts
import Stripe from 'stripe'
import { BillingAdapter } from '../index'
import { config } from '@arc-id/common'

export class StripeWebhookAdapter implements BillingAdapter {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(config.BILLING.STRIPE.SECRET_KEY! as string)
  }

  async handleWebhook(payload: Buffer | string, signature: string) {
    let event: Stripe.Event
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        (config.BILLING.STRIPE.WEBHOOK_SECRET! as string)
      )
    } catch (err: any) {
      console.error(
        '⚠️ Stripe webhook signature verification failed.',
        err.message
      )
      throw new Error('Invalid Stripe webhook signature')
    }

    // Handle event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('✅ Payment succeeded', event.data.object)
        break
      case 'invoice.payment_failed':
        console.log('❌ Invoice failed', event.data.object)
        break
      default:
        console.log(`ℹ️ Unhandled event: ${event.type}`)
    }

    return { received: true }
  }
}
