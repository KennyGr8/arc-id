// packages/adapters/src/mail/loader.ts
import { config } from '@arc-id/common';
import { MailerAdapter } from './types';
import { createProviderLoader } from '../config';

import { consoleMailer, nodemailer, sendgrid, postmark, brevo, resend } from './index';

export type MailProviders = 'console' | 'nodemailer' | 'sendgrid' | 'postmark' | 'brevo' | 'resend';
export type MailDomains = 'transactional' | 'bulk' | 'notification';

let cachedMail = { instance: null as MailerAdapter | null };

const MAIL_ORDER: MailProviders[] = ['brevo', 'resend', 'nodemailer', 'sendgrid', 'postmark', 'console'];

// Factory now aware of both provider + domain
function mailFactory(provider: MailProviders, domain: MailDomains): MailerAdapter | null {
  switch (provider) {
    case 'console':
      if (domain === 'transactional') return new consoleMailer.ConsoleTransactionalAdapter();
      if (domain === 'notification') return new consoleMailer.ConsoleNotificationAdapter();
      break;
      
    case 'nodemailer':
      if (domain === 'transactional') return new nodemailer.NodemailerTransactionalAdapter();
      if (domain === 'notification') return new nodemailer.NodemailerNotificationAdapter();
      break;

    case 'sendgrid':
      if (domain === 'transactional') return new sendgrid.SendGridTransactionalAdapter();
      if (domain === 'bulk') return new sendgrid.SendGridBulkAdapter();
      if (domain === 'notification') return new sendgrid.SendGridNotificationAdapter();
      break;

    case 'postmark':
      if (domain === 'transactional') return new postmark.PostmarkTransactionalAdapter();
      if (domain === "notification") return new postmark.PostmarkNotificationAdapter()
      break;

    case 'brevo':
      if (domain === 'transactional') return new brevo.BrevoTransactionalAdapter();
      if (domain === 'bulk') return new brevo.BrevoBulkAdapter();
      break;

    case 'resend':
      if (domain === 'transactional') return new resend.ResendTransactionalAdapter();
      if (domain === 'notification') return new resend.ResendNotificationAdapter();
      break;
  }
  return null;
}

// Wrapper so we can reuse createProviderLoader but still pass domain
export async function loadMailProvider(
  domain: MailDomains = 'transactional',
  provider?: MailProviders
): Promise<MailerAdapter> {
  return createProviderLoader(
    config.MAIL.PROVIDER as MailProviders,
    (prov) => mailFactory(prov, domain),  // inject domain
    MAIL_ORDER,
    cachedMail,
    domain,
    provider
  );
}
