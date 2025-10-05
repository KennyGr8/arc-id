import { render } from '@react-email/render'
import {
  WelcomeEmail,
  VerifyEmail,
  PasswordReset,
  SessionNotification,
  OtpCode,
} from './templates'
import React from 'react'

export type Template = 'welcome' | 'verify' | 'reset' | 'session' | 'otp'

export type TemplateDataMap = {
  welcome: { userName: string; dashboardLink: string }
  verify: { userName: string; verificationLink: string }
  reset: { userName: string; resetLink: string }
  session: {
    userName: string
    location: string
    device: string
    time: string
    resetLink: string
  }
  otp: { userName: string; otpCode: string }
}

// Map template name to component with exact props type
const templateComponents: {
  [K in Template]: React.FC<TemplateDataMap[K]>
} = {
  welcome: WelcomeEmail,
  verify: VerifyEmail,
  reset: PasswordReset,
  session: SessionNotification,
  otp: OtpCode,
}

export async function renderEmail<T extends Template>(
  template: T,
  data: TemplateDataMap[T]
) {
  const Component = templateComponents[template]
  if (!Component) throw new Error('Unknown email template')
  return render(React.createElement(Component, data))
}
