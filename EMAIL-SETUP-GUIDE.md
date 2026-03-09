# Email System Setup Guide

## Overview
This guide explains how to set up and use the SendGrid email system for your curtain cleaning business.

## Automated Email Features

### 1. Welcome Email
- **Triggered**: When someone subscribes to the newsletter
- **Content**: 
  - Welcome message
  - 10% discount code (WELCOME10)
  - Call-to-action to book a service
  - Company contact information

### 2. Quote Confirmation Email
- **Triggered**: When a customer submits a quote request (contact form or quote calculator)
- **Content**:
  - Quote ID
  - Service type
  - Estimated price
  - Next steps information
  - Contact details

### 3. Booking Confirmation Email
- **Triggered**: When a booking is created in the admin portal
- **Content**:
  - Booking ID
  - Service type and details
  - Scheduled date and time
  - Location address
  - Pre-visit checklist

### 4. Booking Reminder Email
- **Triggered**: Manually sent 24 hours before appointment
- **Content**:
  - Appointment details
  - Arrival time window
  - WhatsApp contact option
  - Rescheduling option

### 5. Newsletter Campaigns
- **Triggered**: Manually sent from admin panel
- **Features**:
  - Send to all active subscribers
  - HTML content support
  - Quick templates included
  - Subscriber count display

## Setup Instructions

### Step 1: Get SendGrid API Key
1. Sign up at [SendGrid.com](https://sendgrid.com)
2. Create a free account or use existing account
3. Go to Settings > API Keys
4. Create a new API key (Full Access)
5. Copy the API key

### Step 2: Set Environment Variables
Add these to your Vercel project environment variables:

```
SENDGRID_API_KEY=your_api_key_here
SENDGRID_FROM_EMAIL=noreply@curtaincleaning.co.za
```

### Step 3: Verify Sender Email
1. In SendGrid, go to Settings > Sender Authentication
2. Complete domain or single sender verification
3. Use the email address set in SENDGRID_FROM_EMAIL

## Using the Email System

### Viewing Subscriber Stats
```
Navigate to: Admin Dashboard > Email Campaigns
- See active subscriber count
- See total subscriber count
- Send campaigns to all subscribers
```

### Sending a Newsletter Campaign
1. Go to Admin Dashboard > Email Campaigns
2. Enter campaign title (e.g., "Spring Cleaning Special")
3. Enter content in HTML format
4. Click "Send to X Subscribers"
5. Confirm send

### Email Templates
All emails include:
- Professional branding
- Company contact information
- Call-to-action buttons
- Responsive design for mobile

## API Endpoints

### Newsletter Statistics
```
GET /api/admin/newsletter-stats
Returns: { activeSubscribers, totalSubscribers }
```

## Email Functions

### Available Functions in `/lib/actions/emails.ts`

#### sendWelcomeEmail(email: string)
```typescript
const result = await sendWelcomeEmail('customer@email.com')
```

#### sendQuoteConfirmationEmail(email, name, quoteId, price, service)
```typescript
const result = await sendQuoteConfirmationEmail(
  'customer@email.com',
  'John Doe',
  'QT-12345',
  '150.00',
  'Curtain Cleaning'
)
```

#### sendBookingConfirmationEmail(email, name, bookingId, service, date, time, address)
```typescript
const result = await sendBookingConfirmationEmail(
  'customer@email.com',
  'John Doe',
  'BK-12345',
  'Curtain Cleaning',
  '2024-03-15',
  '10:00 AM',
  '123 Main Street'
)
```

#### sendBookingReminderEmail(email, name, service, date, time)
```typescript
const result = await sendBookingReminderEmail(
  'customer@email.com',
  'John Doe',
  'Curtain Cleaning',
  '2024-03-15',
  '10:00 AM'
)
```

#### sendNewsletterCampaign(subject: string, content: string)
```typescript
const result = await sendNewsletterCampaign(
  'Spring Cleaning Special',
  '<h3>Save 15% on all services!</h3><p>Book this week...</p>'
)
// Returns: { success: true, count: 125 }
```

## Email Content Guidelines

### Best Practices
1. **Subject Lines**: Keep under 50 characters for mobile
2. **Content**: Use HTML with proper formatting
3. **Call-to-Action**: Use clear, compelling button text
4. **Mobile**: All templates are responsive
5. **Links**: Always include company contact info

### HTML Template Structure
```html
<h3>Main Heading</h3>
<p>Paragraph text with content</p>
<a href="https://curtaincleaning.co.za">Link Text</a>
<strong>Bold text for emphasis</strong>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
```

## Troubleshooting

### Email Not Sending
1. Check SENDGRID_API_KEY is set correctly
2. Verify SENDGRID_FROM_EMAIL is verified in SendGrid
3. Check SendGrid API usage limits (free account has limits)
4. Review console logs for error messages

### Emails Going to Spam
1. Ensure domain/sender is authenticated in SendGrid
2. Include unsubscribe link (automatically included)
3. Avoid spam trigger words
4. Test with different email providers

### Subscriber Count Not Updating
1. Check database connection is working
2. Verify newsletter_subscribers table exists
3. Clear any caching on the statistics page

## SendGrid Account Management

### SendGrid Dashboard
- Monitor email delivery rates
- View bounce and spam reports
- Check API usage
- Manage email templates
- View email statistics

### Free Account Limits
- 100 emails per day
- Upgrade to paid for higher volume

## Future Enhancements

Potential features to add:
- Automated booking reminders (24 hours before)
- Email templates in SendGrid dashboard
- Campaign analytics and open rates
- Subscriber segmentation
- A/B testing for campaigns
- Unsubscribe management

## Support
For SendGrid support: https://support.sendgrid.com
