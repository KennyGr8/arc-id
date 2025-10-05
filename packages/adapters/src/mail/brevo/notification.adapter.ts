import Brevo from "@getbrevo/brevo";

import { MailerAdapter } from "../index";
import { config } from "@arc-id/common";

export class BrevoNotificationAdapter implements MailerAdapter {
  private client: Brevo.TransactionalEmailsApi;
  
  constructor() {
    this.client = new Brevo.TransactionalEmailsApi();
    this.client.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      ( config.MAIL.BREVO.API_KEY! as string).trim()
    );
  }

  private mapRecipients(to?: string | string[]) {
    if (!to) return [];
    return Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];
  }

  async sendEmail({
    to,
    subject,
    html,
    text,
    from,
    cc,
    bcc,
  }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    try {
      await this.client.sendTransacEmail({
        sender: { email: from || config.MAIL.BREVO.FROM },
        to: this.mapRecipients(to),
        cc: this.mapRecipients(cc),
        bcc: this.mapRecipients(bcc),
        subject,
        htmlContent: html,
        textContent: text,
      });
      console.log(`[Brevo][Notification] Email sent to: ${to}`);
    } catch (err) {
      console.error(`[Brevo][Notification] Failed to send email:`, err);
      throw err;
    }
  }
}
