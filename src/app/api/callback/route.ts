import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Callback request handler
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    
    const callbackData = {
      name: body.name,
      phone: body.phone,
      preferred_time: body.preferredTime || 'asap',
      message: body.message || null,
      status: 'pending',
    }

    // Save to Supabase if available
    if (supabase) {
      const { data, error } = await supabase
        .from('callbacks')
        .insert(callbackData)
        .select()
        .single()
      
      if (error) {
        console.error('Callback insert error:', error)
        throw new Error(error.message)
      }

      // Track form submission in analytics
      await supabase.from('analytics_events').insert({
        event_type: 'form_submit',
        page_url: request.headers.get('referer') || null,
        page_title: 'Callback Request',
        metadata: { form_type: 'callback', preferred_time: callbackData.preferred_time },
        created_at: new Date().toISOString(),
      })

      console.log('Callback saved to Supabase:', data.id)
      
      return NextResponse.json({
        success: true,
        message: 'Callback request submitted successfully',
        requestId: data.id,
      })
    }
    
    // No Supabase - log and return success (data won't persist)
    console.log('Callback request received (no database):', callbackData)
    
    return NextResponse.json({
      success: true,
      message: 'Callback request submitted successfully',
      requestId: `temp_${Date.now()}`,
    })
  } catch (error) {
    console.error('Callback request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit callback request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createServerClient()
    
    // No Supabase - return empty
    if (!supabase) {
      return NextResponse.json({ 
        success: true,
        data: [],
        total: 0,
      })
    }

    const { data, error, count } = await supabase
      .from('callbacks')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ 
      success: true,
      data: data || [],
      total: count || 0,
    })
  } catch (error) {
    console.error('Callback fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch callbacks' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { error } = await supabase
      .from('callbacks')
      .update({ status: body.status })
      .eq('id', body.id)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({
      success: true,
      message: 'Callback status updated',
    })
  } catch (error) {
    console.error('Callback update error:', error)
    return NextResponse.json(
      { error: 'Failed to update callback' },
      { status: 500 }
    )
  }
}
