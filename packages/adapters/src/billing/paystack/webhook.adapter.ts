// packages/adapters/src/billing/paystack/webhook.adapter.ts
import axios from 'axios';
import { BillingAdapter } from '../index';
import { config } from '@arc-id/common';
import crypto from 'crypto';

export class PaystackWebhookAdapter implements BillingAdapter {
  async handleWebhook(payload: any, signature: string) {
    const hash = crypto
      .createHmac('sha512', config.BILLING.PAYSTACK.WEBHOOK_SECRET! as string)
      .update(JSON.stringify(payload.body))
      .digest('hex');

    if (hash !== signature) {
      throw new Error('Invalid Paystack webhook signature');
    }

    const event = payload.body;

    switch (event.event) {
      case 'charge.success':
        console.log('✅ Paystack charge successful', event.data);
        break;
      case 'subscription.create':
        console.log('ℹ️ Paystack subscription created', event.data);
        break;
      default:
        console.log(`ℹ️ Unhandled Paystack event: ${event.event}`);
    }

    return { received: true };
  }
}
