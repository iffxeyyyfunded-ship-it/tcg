// lib/resend.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
  to: string | string[]
  subject: string
  react?: React.ReactElement
  html?: string
}

export async function sendEmail({ to, subject, react, html }: SendEmailParams) {
  const payload: any = {
    from: `TCG FUNDED <${process.env.RESEND_FROM_EMAIL || 'noreply@tcgfunded.com'}>`,
    to,
    subject,
  }
  
  if (react) payload.react = react
  if (html) payload.html = html

  return resend.emails.send(payload)
}
