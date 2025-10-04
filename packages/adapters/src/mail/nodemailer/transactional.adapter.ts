// nodemailer/transactional.adapter.ts
import nodemailer from "nodemailer";
import { MailerAdapter } from "../types";
import { config } from "@arc-id/common";

export class NodemailerTransactionalAdapter implements MailerAdapter {
  private transporter = nodemailer.createTransport({
    host: config.MAIL.NODEMAILER.HOST,
    port: Number(config.MAIL.NODEMAILER.PORT),
//    secure: config.MAIL.NODEMAILER.SECURE === "true",
    auth: { user: config.MAIL.NODEMAILER.USER, pass: config.MAIL.NODEMAILER.PASS },
  });

  async sendEmail({ to, subject, text, html, from, cc, bcc }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    await this.transporter.sendMail({
      from: from || config.MAIL.NODEMAILER.FROM,
      to,
      cc,
      bcc,
      subject,
      text,
      html,
    });
  }
}
