// packages/adapters/src/billing/stripe/invoice.adapter.ts
import Stripe from 'stripe';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class StripeInvoiceAdapter implements BillingAdapter {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.BILLING.STRIPE.SECRET_KEY! as string)
  }

  async createInvoice(options: { customerId: string; items: Array<{ description: string; amount: number }> }) {
    const invoiceItems = await Promise.all(
      options.items.map(item =>
        this.stripe.invoiceItems.create({
          customer: options.customerId,
          amount: item.amount,
          currency: 'usd',
          description: item.description,
        })
      )
    );
    return this.stripe.invoices.create({ customer: options.customerId });
  }

  async getInvoice(invoiceId: string) {
    return this.stripe.invoices.retrieve(invoiceId);
  }
}
