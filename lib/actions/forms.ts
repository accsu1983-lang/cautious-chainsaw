'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendWelcomeEmail, sendQuoteConfirmationEmail } from '@/lib/actions/emails'

export async function submitContactForm(formData: {
  name: string
  email: string
  phone: string
  service: string
  message: string
  address?: string
  suburb?: string
}) {
  try {
    const supabase = await createClient()

    // First, create or update the customer
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', formData.email)
      .single()

    let customerId: string

    if (existingCustomer) {
      // Update existing customer
      const { data: updatedCustomer, error: updateError } = await supabase
        .from('customers')
        .update({
          full_name: formData.name,
          phone: formData.phone,
          suburb: formData.suburb,
          address: formData.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingCustomer.id)
        .select()
        .single()

      if (updateError) throw updateError
      customerId = updatedCustomer.id
    } else {
      // Create new customer
      const { data: newCustomer, error: createError } = await supabase
        .from('customers')
        .insert({
          email: formData.email,
          full_name: formData.name,
          phone: formData.phone,
          suburb: formData.suburb,
          address: formData.address,
          notes: formData.message
        })
        .select()
        .single()

      if (createError) throw createError
      customerId = newCustomer.id
    }

    // Create a quote request
    const { error: quoteError } = await supabase
      .from('quotes')
      .insert({
        customer_id: customerId,
        service_type: formData.service,
        status: 'pending',
        notes: formData.message,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      })

    if (quoteError) throw quoteError

    // Send quote confirmation email
    await sendQuoteConfirmationEmail(
      formData.email,
      formData.name,
      'QT-' + Date.now().toString().slice(-8),
      'See email for details',
      formData.service
    )

    revalidatePath('/admin')
    return { success: true, message: 'Quote request submitted successfully!' }
  } catch (error) {
    console.error('[v0] Contact form submission error:', error)
    return { success: false, message: 'Failed to submit form. Please try again.' }
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        subscribed_at: new Date().toISOString()
      })

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return { success: false, message: 'This email is already subscribed!' }
      }
      throw error
    }

    // Send welcome email
    await sendWelcomeEmail(email)

    revalidatePath('/admin/newsletter')
    return { success: true, message: 'Successfully subscribed to newsletter!' }
  } catch (error) {
    console.error('[v0] Newsletter subscription error:', error)
    return { success: false, message: 'Failed to subscribe. Please try again.' }
  }
}

export async function submitQuoteCalculator(data: {
  email: string
  name: string
  phone: string
  serviceType: string
  quantity: string
  estimatedPrice: number
}) {
  try {
    const supabase = await createClient()

    // Create or update customer
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', data.email)
      .single()

    let customerId: string

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const { data: newCustomer, error: createError } = await supabase
        .from('customers')
        .insert({
          email: data.email,
          full_name: data.name,
          phone: data.phone
        })
        .select()
        .single()

      if (createError) throw createError
      customerId = newCustomer.id
    }

    // Create quote with calculator details
    const { error: quoteError } = await supabase
      .from('quotes')
      .insert({
        customer_id: customerId,
        service_type: data.serviceType,
        quantity: parseInt(data.quantity) || 1,
        estimated_price: data.estimatedPrice,
        status: 'pending',
        details: {
          source: 'calculator',
          quantity_range: data.quantity
        },
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })

    if (quoteError) throw quoteError

    // Send quote confirmation email
    await sendQuoteConfirmationEmail(
      data.email,
      data.name,
      'QC-' + Date.now().toString().slice(-8),
      data.estimatedPrice.toFixed(2),
      data.serviceType
    )

    revalidatePath('/admin')
    return { success: true, message: 'Quote saved! We will contact you shortly.' }
  } catch (error) {
    console.error('[v0] Quote calculator submission error:', error)
    return { success: false, message: 'Failed to save quote. Please try again.' }
  }
}
