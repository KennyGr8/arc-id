// packages/adapters/src/billing/loader.ts
import { config } from '@arc-id/common'
import { BillingAdapter } from './types'
import { stripe, paystack, lemon } from './index'
import { createProviderLoader } from '../config'

export type BillingProviders = 'stripe' | 'paystack' | 'lemonsqueezy'
export type BillingDomains = 'checkout' | 'subscription' | 'webhook' | 'invoices' | 'customer'

let cachedBilling = { instance: null as BillingAdapter | null }

const BILLING_ORDER: BillingProviders[] = ['stripe', 'paystack', 'lemonsqueezy']

function billingFactory(provider: BillingProviders, domain: BillingDomains): BillingAdapter | null {
  let adapter: any = null

  switch (provider) {
    case 'stripe':
      if (domain === 'checkout') adapter = new stripe.StripeCheckoutAdapter()
      else if (domain === 'subscription') adapter = new stripe.StripeSubscriptionAdapter()
      else if (domain === 'invoices') adapter = new stripe.StripeInvoiceAdapter()
      else if (domain === 'customer') adapter = new stripe.StripeCustomerAdapter()
      else if (domain === 'webhook') adapter = new stripe.StripeWebhookAdapter()
      break
    case 'paystack':
      if (domain === 'checkout') adapter = new paystack.PaystackCheckoutAdapter()
      else if (domain === 'subscription') adapter = new paystack.PaystackSubscriptionAdapter()
      else if (domain === 'invoices') adapter = new paystack.PaystackInvoiceAdapter()
      else if (domain === 'customer') adapter = new paystack.PaystackCustomerAdapter()
      break
    case 'lemonsqueezy':
      if (domain === 'checkout') adapter = new lemon.LemonCheckoutAdapter()
      else if (domain === 'subscription') adapter = new lemon.LemonSubscriptionAdapter()
      else if (domain === 'invoices') adapter = new lemon.LemonInvoiceAdapter()
      else if (domain === 'customer') adapter = new lemon.LemonCustomerAdapter()
      else if (domain === 'webhook') adapter = new lemon.LemonWebhookAdapter()
      break
  }

  return adapter ?? null
}

export async function loadBillingProvider(
  domain: BillingDomains = 'checkout',
  provider?: BillingProviders
): Promise<BillingAdapter> {
  return createProviderLoader(
    config.BILLING.PROVIDER as BillingProviders,
    billingFactory,
    BILLING_ORDER,
    cachedBilling,
    domain,
    provider
  )
}
