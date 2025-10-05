import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { MailerAdapter } from '../index'
import { config } from '@arc-id/common'

export class SendGridNotificationAdapter implements MailerAdapter {
  constructor() {
    sgMail.setApiKey(config.MAIL.SENDGRID.API_KEY!)
  }

  async sendEmail({
    to,
    subject,
    html,
    text,
    from,
  }: Parameters<MailerAdapter['sendEmail']>[0]) {
    // Build base msg
    const msg: MailDataRequired = {
      to,
      from: (from ?? config.MAIL.SENDGRID.FROM)!,
      subject,
      content: [
        html
          ? { type: 'text/html', value: html }
          : { type: 'text/plain', value: text ?? '' }
      ],
      ...(text ? { text } : {}),
      ...(html ? { html } : {}),
    }

    if (!msg.text && !msg.html) {
      throw new Error("Either 'text' or 'html' must be provided.")
    }

    await sgMail.send(msg)
  }
}
