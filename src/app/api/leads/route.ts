import { NextRequest, NextResponse } from 'next/server'
import { createLead, getLeads } from '@/lib/db'
import { sendLeadConfirmationEmail, sendAdminNotificationEmail, sendCallbackConfirmationEmail } from '@/lib/email'
import { CreateLeadRequest, LeadFilters } from '@/lib/types'

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests
const RATE_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || record.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Validation helper
function validateLeadData(data: unknown): { valid: boolean; errors: string[]; data?: CreateLeadRequest } {
  const errors: string[] = []
  const body = data as Record<string, unknown>

  // Required fields
  if (!body.full_name && !body.name) {
    errors.push('Name is required')
  }
  if (!body.phone) {
    errors.push('Phone is required')
  }

  // Email validation if provided
  if (body.email && typeof body.email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      errors.push('Invalid email format')
    }
  }

  // Phone validation
  if (body.phone && typeof body.phone === 'string') {
    const cleanedPhone = body.phone.replace(/\s/g, '')
    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      errors.push('Invalid phone number')
    }
  }

  // Number of rooms validation
  if (body.number_of_rooms !== undefined && body.numberOfRooms !== undefined) {
    const rooms = body.number_of_rooms || body.numberOfRooms
    if (typeof rooms === 'number' && (rooms < 1 || rooms > 50)) {
      errors.push('Number of rooms must be between 1 and 50')
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  // Transform and sanitize data
  const sanitizedData: CreateLeadRequest = {
    full_name: sanitizeString((body.full_name || body.name) as string),
    phone: sanitizeString(body.phone as string),
    email: body.email ? sanitizeString(body.email as string) : undefined,
    property_postcode: body.property_postcode || body.postcode ? sanitizeString((body.property_postcode || body.postcode) as string) : undefined,
    property_address: body.property_address || body.propertyAddress ? sanitizeString((body.property_address || body.propertyAddress) as string) : undefined,
    property_type: body.property_type || body.propertyType ? sanitizeString((body.property_type || body.propertyType) as string) : undefined,
    number_of_rooms: body.number_of_rooms || body.numberOfRooms ? Number(body.number_of_rooms || body.numberOfRooms) : undefined,
    has_license: body.has_license || body.hasLicense ? sanitizeString((body.has_license || body.hasLicense) as string) : undefined,
    current_occupancy: body.current_occupancy || body.currentOccupancy ? Number(body.current_occupancy || body.currentOccupancy) : undefined,
    current_management: body.current_management || body.currentManagement ? sanitizeString((body.current_management || body.currentManagement) as string) : undefined,
    current_monthly_income: body.current_monthly_income || body.currentMonthlyIncome ? Number(body.current_monthly_income || body.currentMonthlyIncome) : undefined,
    portfolio_owner: Boolean(body.portfolio_owner || body.portfolioOwner),
    main_challenges: Array.isArray(body.main_challenges || body.mainChallenges) ? (body.main_challenges || body.mainChallenges) as string[] : undefined,
    preferred_contact: body.preferred_contact || body.preferredContact ? sanitizeString((body.preferred_contact || body.preferredContact) as string) : 'phone',
    lead_source: body.lead_source || body.leadSource ? sanitizeString((body.lead_source || body.leadSource) as string) : 'website',
    lead_type: body.lead_type || body.type ? sanitizeString((body.lead_type || body.type) as string) : 'assessment',
  }

  return { valid: true, errors: [], data: sanitizedData }
}

function sanitizeString(str: string): string {
  if (!str) return ''
  // Remove potentially dangerous characters
  return str.trim().replace(/<[^>]*>/g, '').substring(0, 500)
}

// ============================================
// POST - Create Lead
// ============================================
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate
    const validation = validateLeadData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(', ') },
        { status: 400 }
      )
    }

    // Create lead in database
    const lead = await createLead(validation.data!)

    // Send emails (don't block response)
    Promise.all([
      sendLeadConfirmationEmail(lead),
      sendAdminNotificationEmail(lead),
      lead.lead_type === 'callback' ? sendCallbackConfirmationEmail(lead) : Promise.resolve(),
    ]).catch(err => {
      console.error('Email sending error:', err)
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will contact you shortly.',
      data: { id: lead.id },
    })
  } catch (error) {
    console.error('Lead creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}

// ============================================
// GET - List Leads (Admin only)
// ============================================
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    // const session = await getServerSession()
    // if (!session?.user?.role === 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const searchParams = request.nextUrl.searchParams
    
    const filters: LeadFilters = {
      status: searchParams.get('status') as LeadFilters['status'] || undefined,
      licensed: searchParams.get('licensed') ? searchParams.get('licensed') === 'true' : undefined,
      portfolio_owner: searchParams.get('portfolio_owner') ? searchParams.get('portfolio_owner') === 'true' : undefined,
      start_date: searchParams.get('start_date') || undefined,
      end_date: searchParams.get('end_date') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 25,
    }

    const result = await getLeads(filters)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error('Get leads error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
