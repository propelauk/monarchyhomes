import { Resend } from 'resend'
import { createServerClient } from './supabase'
import { Lead } from './types'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'Monarchy Homes <noreply@monarchyhomes.com>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@monarchyhomes.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://monarchyhomes.com'

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
  leadId?: string
  template?: string
  emailType?: 'transactional' | 'broadcast' | 'notification'
  sentBy?: string
}

export async function sendEmail(params: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const { to, subject, html, text, leadId, template, emailType = 'transactional', sentBy } = params
  const supabase = createServerClient()

  try {
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      text,
    })

    if (error) {
      // Log failed email
      await supabase.from('email_logs').insert({
        lead_id: leadId,
        recipient_email: to,
        subject,
        template,
        email_type: emailType,
        status: 'failed',
        error_message: error.message,
        sent_by: sentBy,
      })
      
      return { success: false, error: error.message }
    }

    // Log successful email
    await supabase.from('email_logs').insert({
      lead_id: leadId,
      recipient_email: to,
      subject,
      template,
      email_type: emailType,
      status: 'sent',
      metadata: { resend_id: data?.id },
      sent_by: sentBy,
    })

    return { success: true, id: data?.id }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    
    // Log error
    await supabase.from('email_logs').insert({
      lead_id: leadId,
      recipient_email: to,
      subject,
      template,
      email_type: emailType,
      status: 'failed',
      error_message: errorMessage,
      sent_by: sentBy,
    })

    return { success: false, error: errorMessage }
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export function generateLeadConfirmationEmail(lead: Lead): { subject: string; html: string; text: string } {
  const subject = 'Thank You for Your Enquiry - Monarchy Homes'
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background-color: #0D1B2A; padding: 30px; text-align: center;">
        <h1 style="color: #FFC857; margin: 0; font-size: 28px;">Monarchy Homes</h1>
        <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">HMO & Single Let Property Specialists</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #0D1B2A; margin: 0 0 20px 0;">Thank you, ${lead.full_name}!</h2>
        
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          We've received your property assessment request${lead.property_postcode ? ` for <strong>${lead.property_postcode}</strong>` : ''}.
        </p>
        
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          One of our property specialists will contact you within <strong>24 hours</strong> to discuss how we can help maximise your rental income while ensuring full compliance.
        </p>
        
        <div style="background-color: #f8f9fa; border-left: 4px solid #FFC857; padding: 20px; margin: 30px 0;">
          <h3 style="color: #0D1B2A; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h3>
          <ul style="color: #424242; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>We'll review your property details</li>
            <li>A specialist will call to discuss your goals</li>
            <li>We'll provide a free income assessment</li>
            <li>No obligation – just expert advice</li>
          </ul>
        </div>
        
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          In the meantime, feel free to download our free <a href="${SITE_URL}/#resources" style="color: #FFC857;">HMO Compliance Checklist</a>.
        </p>
        
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          Questions? Call us on <a href="tel:01452452308" style="color: #0D1B2A; font-weight: bold;">01452 452308</a>
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #0D1B2A; padding: 30px; text-align: center;">
        <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px;">
          Monarchy Homes | Gloucestershire's Trusted Property Specialists
        </p>
        <p style="color: #9e9e9e; margin: 0; font-size: 12px;">
          Gloucester • Cheltenham • Stroud • Tewkesbury
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
Thank you, ${lead.full_name}!

We've received your property assessment request${lead.property_postcode ? ` for ${lead.property_postcode}` : ''}.

One of our property specialists will contact you within 24 hours to discuss how we can help maximise your rental income while ensuring full compliance.

What happens next?
- We'll review your property details
- A specialist will call to discuss your goals
- We'll provide a free income assessment
- No obligation – just expert advice

Questions? Call us on 01452 452308

Best regards,
The Monarchy Homes Team
`

  return { subject, html, text }
}

export function generateAdminNotificationEmail(lead: Lead): { subject: string; html: string; text: string } {
  const subject = `🏠 New Lead: ${lead.full_name} - ${lead.property_postcode || 'No postcode'}`
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #0D1B2A; padding: 20px;">
        <h2 style="color: #FFC857; margin: 0;">🏠 New Lead Received</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" cellpadding="8" cellspacing="0">
          <tr>
            <td style="color: #666; width: 140px;">Name:</td>
            <td style="color: #0D1B2A; font-weight: bold;">${lead.full_name}</td>
          </tr>
          <tr>
            <td style="color: #666;">Phone:</td>
            <td style="color: #0D1B2A;"><a href="tel:${lead.phone}" style="color: #0D1B2A; font-weight: bold;">${lead.phone}</a></td>
          </tr>
          <tr>
            <td style="color: #666;">Email:</td>
            <td style="color: #0D1B2A;">${lead.email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="color: #666;">Postcode:</td>
            <td style="color: #0D1B2A;">${lead.property_postcode || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="color: #666;">Property Type:</td>
            <td style="color: #0D1B2A;">${lead.property_type || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="color: #666;">Rooms:</td>
            <td style="color: #0D1B2A;">${lead.number_of_rooms || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="color: #666;">Licensed:</td>
            <td style="color: ${lead.licensed ? '#22c55e' : '#ef4444'}; font-weight: bold;">
              ${lead.has_license || (lead.licensed ? 'Yes' : 'No')}
            </td>
          </tr>
          <tr>
            <td style="color: #666;">Lead Type:</td>
            <td style="color: #0D1B2A;">${lead.lead_type}</td>
          </tr>
          <tr>
            <td style="color: #666;">Source:</td>
            <td style="color: #0D1B2A;">${lead.lead_source}</td>
          </tr>
          ${lead.main_challenges?.length ? `
          <tr>
            <td style="color: #666;">Challenges:</td>
            <td style="color: #0D1B2A;">${lead.main_challenges.join(', ')}</td>
          </tr>
          ` : ''}
        </table>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="${SITE_URL}/admin/leads/${lead.id}" style="display: inline-block; background-color: #FFC857; color: #0D1B2A; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            View in Dashboard →
          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
New Lead Received

Name: ${lead.full_name}
Phone: ${lead.phone}
Email: ${lead.email || 'Not provided'}
Postcode: ${lead.property_postcode || 'Not provided'}
Rooms: ${lead.number_of_rooms || 'Not provided'}
Licensed: ${lead.has_license || (lead.licensed ? 'Yes' : 'No')}
Type: ${lead.lead_type}
Source: ${lead.lead_source}

View in dashboard: ${SITE_URL}/admin/leads/${lead.id}
`

  return { subject, html, text }
}

export function generateCallbackConfirmationEmail(lead: Lead): { subject: string; html: string; text: string } {
  const subject = 'Callback Request Confirmed - Monarchy Homes'
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #0D1B2A; padding: 30px; text-align: center;">
        <h1 style="color: #FFC857; margin: 0; font-size: 28px;">Monarchy Homes</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #0D1B2A; margin: 0 0 20px 0;">Callback Confirmed</h2>
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          Hi ${lead.full_name},
        </p>
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          We've received your callback request. One of our team will call you at <strong>${lead.phone}</strong> shortly.
        </p>
        <p style="color: #424242; font-size: 16px; line-height: 1.6;">
          If you need to reach us urgently, call <a href="tel:01452452308" style="color: #0D1B2A; font-weight: bold;">01452 452308</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #0D1B2A; padding: 20px; text-align: center;">
        <p style="color: #9e9e9e; margin: 0; font-size: 12px;">
          Monarchy Homes | Gloucestershire
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
Callback Confirmed

Hi ${lead.full_name},

We've received your callback request. One of our team will call you at ${lead.phone} shortly.

If you need to reach us urgently, call 01452 452308.

Best regards,
Monarchy Homes
`

  return { subject, html, text }
}

// ============================================
// SEND LEAD EMAILS
// ============================================

export async function sendLeadConfirmationEmail(lead: Lead): Promise<void> {
  if (!lead.email) return

  const { subject, html, text } = generateLeadConfirmationEmail(lead)
  
  await sendEmail({
    to: lead.email,
    subject,
    html,
    text,
    leadId: lead.id,
    template: 'lead_confirmation',
    emailType: 'transactional',
  })
}

export async function sendAdminNotificationEmail(lead: Lead): Promise<void> {
  const { subject, html, text } = generateAdminNotificationEmail(lead)
  
  await sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
    text,
    leadId: lead.id,
    template: 'admin_notification',
    emailType: 'notification',
  })
}

export async function sendCallbackConfirmationEmail(lead: Lead): Promise<void> {
  if (!lead.email) return

  const { subject, html, text } = generateCallbackConfirmationEmail(lead)
  
  await sendEmail({
    to: lead.email,
    subject,
    html,
    text,
    leadId: lead.id,
    template: 'callback_confirmation',
    emailType: 'transactional',
  })
}
