// sendgrid/bulk.adapter.ts
import sgMail from "@sendgrid/mail";
import { MailerAdapter } from "../types";
import { config } from "@arc-id/common";

export class SendGridBulkAdapter implements MailerAdapter {
  constructor() {
    sgMail.setApiKey(config.MAIL.SENDGRID.API_KEY! as string);
  }

  async sendEmail({ to, subject, text, html, from, cc, bcc }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    const recipients = Array.isArray(to) ? to : [to];
    await sgMail.sendMultiple({
      from: from ?? config.MAIL.SENDGRID.FROM ?? "",
      to: recipients,
      cc,
      bcc,
      subject,
      content: [
        text
          ? { type: "text/plain", value: text }
          : { type: "text/plain", value: "" },
        html
          ? { type: "text/html", value: html }
          : { type: "text/html", value: "" },
      ],
    });
  }
}