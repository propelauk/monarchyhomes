import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { createServerClient } from '@/lib/supabase'

// ============================================
// POST - Send Email
// ============================================
export async function POST(request: NextRequest) {
  try {
    // In production, verify admin authentication
    
    const body = await request.json()

    // Validate
    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      )
    }

    const result = await sendEmail({
      to: body.to,
      subject: body.subject,
      html: body.html,
      text: body.text,
      leadId: body.lead_id,
      template: body.template,
      emailType: body.email_type || 'transactional',
      sentBy: body.sent_by,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: result.id },
    })
  } catch (error) {
    console.error('Send email error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

// ============================================
// GET - Get Email Logs (Admin only)
// ============================================
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '25')

    // No Supabase - return empty email logs
    if (!supabase) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        page: 1,
        limit: 25,
        totalPages: 0,
      })
    }
    
    const leadId = searchParams.get('lead_id')
    const status = searchParams.get('status')

    let query = supabase
      .from('email_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (leadId) {
      query = query.eq('lead_id', leadId)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('Get email logs error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch email logs' },
      { status: 500 }
    )
  }
}
