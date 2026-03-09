import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// ============================================
// POST - Log Analytics Event
// ============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    // Demo mode - just log and return success
    if (!supabase) {
      console.log('[DEMO MODE] Analytics event:', body.event_type)
      return NextResponse.json({ success: true })
    }

    // Validate event type
    const validEventTypes = ['page_view', 'cta_click', 'form_start', 'form_submit', 'calculator_used', 'resource_download']
    if (!body.event_type || !validEventTypes.includes(body.event_type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid event type' },
        { status: 400 }
      )
    }

    // Get device info from user agent
    const userAgent = request.headers.get('user-agent') || ''
    let deviceType = 'desktop'
    if (/mobile/i.test(userAgent)) {
      deviceType = 'mobile'
    } else if (/tablet|ipad/i.test(userAgent)) {
      deviceType = 'tablet'
    }

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: body.event_type,
        page_url: body.page_url || null,
        page_title: body.page_title || null,
        session_id: body.session_id || null,
        visitor_id: body.visitor_id || null,
        referrer: body.referrer || request.headers.get('referer') || null,
        user_agent: userAgent,
        device_type: deviceType,
        metadata: body.metadata || null,
      })

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    // Don't fail silently for analytics
    return NextResponse.json({ success: true })
  }
}

// ============================================
// GET - Get Analytics Data (Admin only)
// ============================================
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || '7d'

    // No Supabase - return empty analytics
    if (!supabase) {
      return NextResponse.json({
        success: true,
        data: {
          period,
          totalEvents: 0,
          pageViews: 0,
          ctaClicks: 0,
          formSubmits: 0,
          topPages: [],
          deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
          funnel: {
            pageViews: 0,
            ctaClicks: 0,
            formStarts: 0,
            formSubmits: 0,
            ctaRate: 0,
            formStartRate: 0,
            conversionRate: 0,
          },
          trends: {
            pageViews: 0,
            ctaClicks: 0,
            formSubmits: 0,
            conversionRate: 0,
          },
        },
      })
    }

    // Calculate date range for current and previous periods
    const now = new Date()
    let startDate: Date
    let prevStartDate: Date
    let prevEndDate: Date
    
    switch (period) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        prevEndDate = new Date(startDate.getTime())
        prevStartDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        prevEndDate = new Date(startDate.getTime())
        prevStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        prevEndDate = new Date(startDate.getTime())
        prevStartDate = new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        prevEndDate = new Date(startDate.getTime())
        prevStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    // Get current period events
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // Get previous period events for trend calculation
    const { data: prevEvents } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', prevStartDate.toISOString())
      .lt('created_at', prevEndDate.toISOString())

    // Aggregate current period data
    const totalPageViews = events?.filter(e => e.event_type === 'page_view').length || 0
    const totalCtaClicks = events?.filter(e => e.event_type === 'cta_click').length || 0
    const totalFormStarts = events?.filter(e => e.event_type === 'form_start').length || 0
    // Count both form_submit AND resource_download as form submissions (both involve filling a form)
    const totalFormSubmits = events?.filter(e => e.event_type === 'form_submit' || e.event_type === 'resource_download').length || 0

    // Aggregate previous period data for trends
    const prevPageViews = prevEvents?.filter(e => e.event_type === 'page_view').length || 0
    const prevCtaClicks = prevEvents?.filter(e => e.event_type === 'cta_click').length || 0
    const prevFormSubmits = prevEvents?.filter(e => e.event_type === 'form_submit' || e.event_type === 'resource_download').length || 0
    const prevFormStarts = prevEvents?.filter(e => e.event_type === 'form_start').length || 0

    // Calculate trend percentages (compare to previous period)
    const calculateTrend = (current: number, previous: number): number => {
      if (previous === 0) {
        return current > 0 ? 100 : 0 // If no previous data, show 100% if we have current data
      }
      return Math.round(((current - previous) / previous) * 100 * 10) / 10 // One decimal place
    }

    const prevConversionRate = prevCtaClicks > 0 ? (prevFormSubmits / prevCtaClicks) * 100 : 0
    const currentConversionRate = totalCtaClicks > 0 ? (totalFormSubmits / totalCtaClicks) * 100 : 0

    const trends = {
      pageViews: calculateTrend(totalPageViews, prevPageViews),
      ctaClicks: calculateTrend(totalCtaClicks, prevCtaClicks),
      formSubmits: calculateTrend(totalFormSubmits, prevFormSubmits),
      conversionRate: calculateTrend(currentConversionRate, prevConversionRate),
    }

    // Top pages
    const pageViews = events?.filter(e => e.event_type === 'page_view') || []
    const pageCounts: Record<string, number> = {}
    pageViews.forEach(pv => {
      const url = pv.page_url || 'unknown'
      pageCounts[url] = (pageCounts[url] || 0) + 1
    })
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([url, count]) => ({ url, count }))

    // Device breakdown
    const deviceCounts: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 }
    events?.forEach(e => {
      if (e.device_type && e.device_type in deviceCounts) {
        deviceCounts[e.device_type]++
      }
    })

    // Funnel data
    // Conversion rate: form submissions / CTA clicks (or page views if no CTA clicks)
    // This is more meaningful than formSubmits/formStarts since formStarts may not be tracked
    const ctaToFormRate = totalCtaClicks > 0 ? Math.round((totalFormSubmits / totalCtaClicks) * 100) : 0
    const pageToFormRate = totalPageViews > 0 ? Math.round((totalFormSubmits / totalPageViews) * 100) : 0
    
    const funnelData = {
      pageViews: totalPageViews,
      ctaClicks: totalCtaClicks,
      formStarts: totalFormStarts,
      formSubmits: totalFormSubmits,
      ctaRate: totalPageViews > 0 ? Math.round((totalCtaClicks / totalPageViews) * 100) : 0,
      formStartRate: totalCtaClicks > 0 ? Math.round((totalFormStarts / totalCtaClicks) * 100) : 0,
      // Use CTA-to-form conversion if we have CTA clicks, otherwise page-to-form
      conversionRate: totalCtaClicks > 0 ? ctaToFormRate : pageToFormRate,
    }

    return NextResponse.json({
      success: true,
      data: {
        period,
        totalEvents: events?.length || 0,
        pageViews: totalPageViews,
        ctaClicks: totalCtaClicks,
        formSubmits: totalFormSubmits,
        topPages,
        deviceBreakdown: deviceCounts,
        funnel: funnelData,
        trends,
      },
    })
  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
