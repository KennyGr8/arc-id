// types.ts
export interface MailerAdapter {
  sendEmail(options: {
    to: string | string[]
    subject: string
    text?: string
    html?: string
    template?: string
    data?: Record<string, any>
    from?: string
    cc?: string | string[]
    bcc?: string | string[]
  }): Promise<void>
}
