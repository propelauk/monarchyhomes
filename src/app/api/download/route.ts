import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendEmail, generateResourceDownloadEmail } from '@/lib/email'
import crypto from 'crypto'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://monarchyhomes.com'

// Resource configuration
const RESOURCES: Record<string, { title: string; filename: string; description: string }> = {
  'renters-rights-act': {
    title: 'The Renters Rights Act Explained',
    filename: 'The Renters Rights Act explained.pdf',
    description: 'Your comprehensive guide to understanding the new Renters Rights Act',
  },
}

// Generate a secure download token
function generateDownloadToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Resource download handler (lead magnet)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      )
    }

    const resourceKey = body.resource || 'renters-rights-act'
    const resource = RESOURCES[resourceKey]
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Invalid resource' },
        { status: 400 }
      )
    }

    // Generate download token
    const downloadToken = generateDownloadToken()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Try to save to Supabase
    const supabase = createServerClient()
    
    if (supabase) {
      // Save download request
      await supabase.from('downloads').insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        resource: resourceKey,
        download_token: downloadToken,
        expires_at: expiresAt.toISOString(),
        downloaded: false,
        created_at: new Date().toISOString(),
      })

      // Also create a lead entry so it shows in admin dashboard
      await supabase.from('leads').insert({
        full_name: body.name,
        phone: body.phone,
        email: body.email,
        lead_source: 'website',
        lead_type: 'download',
        status: 'new',
        tags: [resource.title],
        notes: `Downloaded: ${resource.title}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      // Track download event in analytics
      await supabase.from('analytics_events').insert({
        event_type: 'resource_download',
        page_url: `${SITE_URL}/resources/landlord-guide`,
        page_title: `Download: ${resource.title}`,
        metadata: { resource: resourceKey, name: body.name },
        created_at: new Date().toISOString(),
      })
    }

    // Generate download URL
    const downloadUrl = `${SITE_URL}/download/${downloadToken}`

    // Send email with download link
    const { subject, html, text } = generateResourceDownloadEmail({
      name: body.name,
      resourceTitle: resource.title,
      resourceDescription: resource.description,
      downloadUrl,
    })

    await sendEmail({
      to: body.email,
      subject,
      html,
      text,
      template: 'resource_download',
      emailType: 'transactional',
    })

    // Log for development
    console.log('Download request processed:', {
      name: body.name,
      email: body.email,
      resource: resourceKey,
      downloadUrl,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Download link sent to your email',
    })
  } catch (error) {
    console.error('Download request error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: 'download',
    methods: ['POST']
  })
}
