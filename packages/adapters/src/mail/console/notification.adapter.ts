// console/notification.adapter.ts
import { MailerAdapter } from "../types";

export class ConsoleNotificationAdapter implements MailerAdapter {
  async sendEmail({ to, subject, text, html, cc, bcc }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    console.log("[Console Mailer][Notification] →", { to, cc, bcc, subject, text, html });
  }
}