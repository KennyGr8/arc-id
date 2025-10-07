// packages/adapters/src/mail/loader.ts
import { config } from '@arc-id/common'
import { MailerAdapter } from './types'
import { createProviderLoader } from '../config'
import { consoleMailer, nodemailer, sendgrid, postmark, brevo, resend } from './index'

export type MailProviders = 'console' | 'nodemailer' | 'sendgrid' | 'postmark' | 'brevo' | 'resend'
export type MailDomains = 'transactional' | 'bulk' | 'notification'

let cachedMail = { instance: null as MailerAdapter | null }

const MAIL_ORDER: MailProviders[] = ['brevo', 'resend', 'nodemailer', 'sendgrid', 'postmark', 'console']

function mailFactory(provider: MailProviders, domain: MailDomains): MailerAdapter | null {
  let adapter: any = null

  switch (provider) {
    case 'console':
      adapter = domain === 'transactional'
        ? new consoleMailer.ConsoleTransactionalAdapter()
        : new consoleMailer.ConsoleNotificationAdapter()
      break
    case 'nodemailer':
      adapter = domain === 'transactional'
        ? new nodemailer.NodemailerTransactionalAdapter()
        : new nodemailer.NodemailerNotificationAdapter()
      break
    case 'sendgrid':
      if (domain === 'transactional') adapter = new sendgrid.SendGridTransactionalAdapter()
      else if (domain === 'bulk') adapter = new sendgrid.SendGridBulkAdapter()
      else adapter = new sendgrid.SendGridNotificationAdapter()
      break
    case 'postmark':
      adapter = domain === 'transactional'
        ? new postmark.PostmarkTransactionalAdapter()
        : new postmark.PostmarkNotificationAdapter()
      break
    case 'brevo':
      adapter = domain === 'transactional'
        ? new brevo.BrevoTransactionalAdapter()
        : new brevo.BrevoBulkAdapter()
      break
    case 'resend':
      adapter = domain === 'transactional'
        ? new resend.ResendTransactionalAdapter()
        : new resend.ResendNotificationAdapter()
      break
  }

  return adapter ? { sendEmail: adapter.sendEmail.bind(adapter) } : null
}

export async function loadMailProvider(
  domain: MailDomains = 'transactional',
  provider?: MailProviders
): Promise<MailerAdapter> {
  return createProviderLoader(
    config.MAIL.PROVIDER as MailProviders,
    (prov) => mailFactory(prov, domain),
    MAIL_ORDER,
    cachedMail,
    domain,
    provider
  )
}
