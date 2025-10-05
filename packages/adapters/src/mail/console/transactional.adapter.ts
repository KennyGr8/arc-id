// console/transactional.adapter.ts
import { MailerAdapter } from "../index";

export class ConsoleTransactionalAdapter implements MailerAdapter {
  async sendEmail({ to, subject, text, html, cc, bcc }: Parameters<MailerAdapter["sendEmail"]>[0]) {
    console.log("[Console Mailer][Transactional] →", { to, cc, bcc, subject, text, html });
  }
}
