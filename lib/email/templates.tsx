export function welcomeEmailTemplate(email: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
          .header { background: #1a5490; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { background: white; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .button { display: inline-block; background: #1a5490; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          a { color: #1a5490; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to On The Spot!</h1>
          </div>
          <div class="content">
            <h2>Hello,</h2>
            <p>Thank you for subscribing to our newsletter! You're now part of our exclusive community of customers who get special offers and updates about our professional cleaning services.</p>

            <h3>What You'll Get:</h3>
            <ul>
              <li>✨ Exclusive discounts and promotions</li>
              <li>📧 Monthly cleaning tips and tricks</li>
              <li>🎯 Early access to special offers</li>
              <li>📞 Priority customer support</li>
            </ul>

            <p>Get a <strong>10% discount on your first service</strong> when you book within the next 30 days. Use code: <strong>WELCOME10</strong></p>

            <a href="https://curtaincleaning.co.za#contact" class="button">Book Your Service Today</a>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              If you have any questions, feel free to reply to this email or call us at <strong>075 011 9200</strong>.
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2024 On The Spot Cleaning. All rights reserved.</p>
            <p><a href="https://curtaincleaning.co.za">Visit our website</a></p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function quoteConfirmationTemplate(customerName: string, quoteId: string, estimatedPrice: string, serviceType: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
          .header { background: #27ae60; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { background: white; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .quote-box { background: #f0f0f0; padding: 20px; border-left: 4px solid #27ae60; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .button { display: inline-block; background: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          a { color: #27ae60; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Quote Confirmation</h1>
          </div>
          <div class="content">
            <h2>Hi ${customerName},</h2>
            <p>Thank you for requesting a quote! We've received your cleaning service inquiry and our team is reviewing the details.</p>

            <div class="quote-box">
              <h3>Quote Summary</h3>
              <p><strong>Quote ID:</strong> ${quoteId}</p>
              <p><strong>Service Type:</strong> ${serviceType}</p>
              <p><strong>Estimated Price:</strong> R${estimatedPrice}</p>
              <p style="color: #666; font-size: 14px;">*Final price may vary based on inspection</p>
            </div>

            <h3>Next Steps</h3>
            <ol>
              <li>Our team will contact you within 1 hour (business hours) to confirm details</li>
              <li>We'll discuss the best time for your cleaning service</li>
              <li>You'll receive a final confirmation before we arrive</li>
            </ol>

            <a href="https://curtaincleaning.co.za#contact" class="button">Contact Us</a>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Questions? Call us at <strong>075 011 9200</strong> or reply to this email.
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2024 On The Spot Cleaning. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function bookingConfirmationTemplate(customerName: string, bookingId: string, serviceType: string, date: string, time: string, address: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
          .header { background: #2980b9; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { background: white; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .booking-details { background: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .button { display: inline-block; background: #2980b9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          a { color: #2980b9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed ✓</h1>
          </div>
          <div class="content">
            <h2>Hi ${customerName},</h2>
            <p>Your cleaning service has been confirmed! Our professional team is ready to serve you.</p>

            <div class="booking-details">
              <h3>Booking Details</h3>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Location:</strong> ${address}</p>
            </div>

            <h3>Before We Arrive</h3>
            <ul>
              <li>Ensure access to the service area</li>
              <li>Move any fragile items if needed</li>
              <li>Let us know of any special instructions</li>
            </ul>

            <h3>On the Day</h3>
            <p>Our team will arrive at the scheduled time. If you need to reschedule or have questions, please call us at <strong>075 011 9200</strong>.</p>

            <a href="https://curtaincleaning.co.za#contact" class="button">Contact Us</a>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Thank you for choosing On The Spot Cleaning!
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2024 On The Spot Cleaning. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function bookingReminderTemplate(customerName: string, serviceType: string, date: string, time: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
          .header { background: #e67e22; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { background: white; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .reminder-box { background: #fff3cd; padding: 20px; border-left: 4px solid #e67e22; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .button { display: inline-block; background: #e67e22; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          a { color: #e67e22; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Reminder</h1>
          </div>
          <div class="content">
            <h2>Hi ${customerName},</h2>
            <p>This is a friendly reminder about your upcoming cleaning appointment.</p>

            <div class="reminder-box">
              <h3>Your Appointment</h3>
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>

            <h3>Reminders</h3>
            <ul>
              <li>Ensure someone is available at the scheduled time</li>
              <li>Please move any delicate items if needed</li>
              <li>Our team will arrive within 15 minutes of the scheduled time</li>
            </ul>

            <p style="margin-top: 20px;">If you need to reschedule or have any questions, please contact us at <strong>075 011 9200</strong>.</p>

            <a href="https://wa.me/27750119200" class="button">Message via WhatsApp</a>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              We look forward to serving you!
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2024 On The Spot Cleaning. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function newsletterTemplate(subject: string, content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
          .header { background: linear-gradient(135deg, #1a5490 0%, #2980b9 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { background: white; padding: 30px; margin: 20px 0; border-radius: 8px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .button { display: inline-block; background: #1a5490; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          a { color: #1a5490; }
          h2 { color: #1a5490; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>On The Spot Newsletter</h1>
          </div>
          <div class="content">
            <h2>${subject}</h2>
            ${content}

            <a href="https://curtaincleaning.co.za" class="button">Visit Our Website</a>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Questions? Call us at <strong>075 011 9200</strong>
            </p>
          </div>
          <div class="footer">
            <p>&copy; 2024 On The Spot Cleaning. All rights reserved.</p>
            <p><a href="https://curtaincleaning.co.za">Visit our website</a></p>
          </div>
        </div>
      </body>
    </html>
  `
}
