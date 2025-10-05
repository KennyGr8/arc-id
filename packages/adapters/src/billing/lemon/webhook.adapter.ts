// packages/adapters/src/billing/lemon/webhook.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';

export class LemonWebhookAdapter implements BillingAdapter {
  async handleWebhook(payload: any, signature: string) {
    // LemonSqueezy signs the webhook payload using a secret
    const receivedSignature = payload.headers?.['x-signature'] || payload.headers?.['X-Signature'];
    if (receivedSignature !== config.BILLING.LEMON.WEBHOOK_SECRET) {
      throw new Error('Invalid Lemon webhook signature');
    }

    const event = payload.body;

    // Example event handling
    switch (event.type) {
      case 'order_created':
        console.log('✅ Lemon order created', event.data);
        break;
      case 'subscription_cancelled':
        console.log('❌ Lemon subscription cancelled', event.data);
        break;
      default:
        console.log(`ℹ️ Unhandled Lemon event: ${event.type}`);
    }

    return { received: true };
  }
}
