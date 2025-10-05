// postmark/transactional.adapter.ts
import { ServerClient } from "postmark";
import { MailerAdapter } from "../index";
import { config } from "@arc-id/common";

export class PostmarkTransactionalAdapter implements MailerAdapter {
  private client = new ServerClient(config.MAIL.POSTMARK.API_KEY! as string);

  async sendEmail({ to, subject, text, html, from, cc, bcc }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    await this.client.sendEmail({
      From: from ?? config.MAIL.POSTMARK.FROM ?? "",
      To: Array.isArray(to) ? to.join(",") : to,
      Cc: Array.isArray(cc) ? cc.join(",") : cc,
      Bcc: Array.isArray(bcc) ? bcc.join(",") : bcc,
      Subject: subject,
      TextBody: text,
      HtmlBody: html,
    });
  }
}