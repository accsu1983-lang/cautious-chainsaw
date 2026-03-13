'use server'

import { sendEmail, sendBulkEmail } from '@/lib/email/sendgrid'
import {
  welcomeEmailTemplate,
  quoteConfirmationTemplate,
  bookingConfirmationTemplate,
  bookingReminderTemplate,
  newsletterTemplate,
} from '@/lib/email/templates'
import { createClient } from '@/lib/supabase/server'

export async function sendWelcomeEmail(email: string) {
  try {
    const html = welcomeEmailTemplate(email)
    const result = await sendEmail({
      to: email,
      subject: 'Welcome to On The Spot Cleaning!',
      html,
    })

    if (result.success) {
      console.log('[v0] Welcome email sent to:', email)
      return { success: true }
    } else {
      console.error('[v0] Welcome email failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('[v0] Welcome email error:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendQuoteConfirmationEmail(
  email: string,
  customerName: string,
  quoteId: string,
  estimatedPrice: string,
  serviceType: string
) {
  try {
    const html = quoteConfirmationTemplate(customerName, quoteId, estimatedPrice, serviceType)
    const result = await sendEmail({
      to: email,
      subject: `Quote Confirmation - On The Spot Cleaning (ID: ${quoteId})`,
      html,
    })

    if (result.success) {
      console.log('[v0] Quote confirmation email sent to:', email)
      return { success: true }
    } else {
      console.error('[v0] Quote confirmation email failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('[v0] Quote confirmation email error:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendBookingConfirmationEmail(
  email: string,
  customerName: string,
  bookingId: string,
  serviceType: string,
  date: string,
  time: string,
  address: string
) {
  try {
    const html = bookingConfirmationTemplate(customerName, bookingId, serviceType, date, time, address)
    const result = await sendEmail({
      to: email,
      subject: `Booking Confirmed - On The Spot Cleaning (ID: ${bookingId})`,
      html,
    })

    if (result.success) {
      console.log('[v0] Booking confirmation email sent to:', email)
      return { success: true }
    } else {
      console.error('[v0] Booking confirmation email failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('[v0] Booking confirmation email error:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendBookingReminderEmail(
  email: string,
  customerName: string,
  serviceType: string,
  date: string,
  time: string
) {
  try {
    const html = bookingReminderTemplate(customerName, serviceType, date, time)
    const result = await sendEmail({
      to: email,
      subject: `Reminder: Your ${serviceType} Appointment Tomorrow`,
      html,
    })

    if (result.success) {
      console.log('[v0] Booking reminder email sent to:', email)
      return { success: true }
    } else {
      console.error('[v0] Booking reminder email failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('[v0] Booking reminder email error:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendNewsletterCampaign(subject: string, content: string) {
  try {
    const supabase = await createClient()

    // Fetch all active newsletter subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('is_active', true)

    if (fetchError || !subscribers) {
      console.error('[v0] Failed to fetch subscribers:', fetchError)
      return { success: false, error: 'Failed to fetch subscribers' }
    }

    if (subscribers.length === 0) {
      return { success: false, error: 'No active subscribers' }
    }

    const emails = subscribers.map((s) => s.email)
    const html = newsletterTemplate(subject, content)

    const result = await sendBulkEmail(emails, `On The Spot Newsletter: ${subject}`, html)

    if (result.success) {
      console.log('[v0] Newsletter campaign sent to', result.count, 'subscribers')
      return { success: true, count: result.count }
    } else {
      console.error('[v0] Newsletter campaign failed:', result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('[v0] Newsletter campaign error:', error)
    return { success: false, error: String(error) }
  }
}
