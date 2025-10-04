// resend/transactional.adapter.ts
import { Resend } from "resend";
import { MailerAdapter } from "../types";
import { config } from "@arc-id/common";

export class ResendTransactionalAdapter implements MailerAdapter {
  private client = new Resend(config.MAIL.RESEND.API_KEY! as string);

  async sendEmail({ to, subject, html, text, from, cc, bcc }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    await this.client.emails.send({
      from: from ?? config.MAIL.RESEND.FROM ?? "",
      to: Array.isArray(to) ? to : [to],
      cc,
      bcc,
      subject,
      // If you have a React component for the email, pass it here. Otherwise, fallback to html/text only if supported.
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
      react: undefined, // Required by CreateEmailOptions, set to undefined if not using React templates
      // react: YourReactComponent, // Uncomment and provide if you use React email templates
    });
  }
}
