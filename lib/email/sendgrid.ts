import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export interface EmailPayload {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail(payload: EmailPayload) {
  try {
    const message = {
      to: payload.to,
      from: payload.from || process.env.SENDGRID_FROM_EMAIL || 'noreply@curtaincleaning.co.za',
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo || process.env.SENDGRID_FROM_EMAIL || 'info@curtaincleaning.co.za',
    }

    const result = await sgMail.send(message)
    console.log('[v0] Email sent successfully:', result[0].statusCode)
    return { success: true, messageId: result[0].headers['x-message-id'] }
  } catch (error) {
    console.error('[v0] Email send failed:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendBulkEmail(recipients: string[], subject: string, html: string) {
  try {
    const messages = recipients.map(email => ({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@curtaincleaning.co.za',
      subject,
      html,
      replyTo: process.env.SENDGRID_FROM_EMAIL || 'info@curtaincleaning.co.za',
    }))

    const result = await sgMail.sendMultiple({
      to: [{ email: recipients[0] }],
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@curtaincleaning.co.za',
      subject,
      html,
      personalizations: recipients.map(email => ({
        to: [{ email }],
      })),
      replyTo: { email: process.env.SENDGRID_FROM_EMAIL || 'info@curtaincleaning.co.za' },
    })

    console.log('[v0] Bulk email sent successfully')
    return { success: true, count: recipients.length }
  } catch (error) {
    console.error('[v0] Bulk email send failed:', error)
    return { success: false, error: String(error) }
  }
}
