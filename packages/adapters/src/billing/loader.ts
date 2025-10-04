// packages/adapters/src/billing/loader.ts
import { config } from '@arc-id/common';
import { BillingAdapter } from './types';
import { stripe, paystack, lemon } from './index'
import { createProviderLoader } from '../config';

export type BillingProviders = 'stripe' | 'paystack' | 'lemonsqueezy';
export type BillingDomains = 'checkout' | 'subscription' | 'webhook' | 'invoices' | 'customer';

let cachedBilling = { instance: null as BillingAdapter | null };

const BILLING_ORDER: BillingProviders[] = ['stripe', 'paystack', 'lemonsqueezy'];

function billingFactory(provider: BillingProviders, domain: BillingDomains): BillingAdapter | null {
   switch (provider) {
    case 'stripe':
      if (domain === 'checkout') return new stripe.StripeCheckoutAdapter();
      if (domain === 'subscription') return new stripe.StripeSubscriptionAdapter();
      if (domain === 'invoices') return new stripe.StripeInvoiceAdapter();
      if (domain === 'customer') return new stripe.StripeCustomerAdapter();
      if (domain === 'webhook') return new stripe.StripeWebhookAdapter();
      break;

    case 'paystack':
      if (domain === 'checkout') return new paystack.PaystackCheckoutAdapter();
      if (domain === 'subscription') return new paystack.PaystackSubscriptionAdapter();
      if (domain === 'invoices') return new paystack.PaystackInvoiceAdapter();
      if (domain === 'customer') return new paystack.PaystackCustomerAdapter();
      break;

    case 'lemonsqueezy':
      if (domain === 'checkout') return new lemon.LemonCheckoutAdapter();
      if (domain === 'subscription') return new lemon.LemonSubscriptionAdapter();
      if (domain === 'invoices') return new lemon.LemonInvoiceAdapter();
      if (domain === 'customer') return new lemon.LemonCustomerAdapter();
      if (domain === 'webhook') return new lemon.LemonWebhookAdapter();
      break;
  }
  return null;
}

export async function loadBillingProvider(domain: BillingDomains = 'checkout', provider?: BillingProviders): Promise<BillingAdapter> {
  return createProviderLoader(
    config.BILLING.PROVIDER as BillingProviders,
    billingFactory,
    BILLING_ORDER,
    cachedBilling,
    domain,
    provider
  );
}
