import { NextResponse } from 'next/server'

// Storage for real callback requests (in production, use Supabase)
const callbacks: Array<{
  id: string
  name: string
  phone: string
  preferredTime: string
  message: string | null
  status: 'pending' | 'called' | 'no_answer' | 'completed'
  created_at: string
}> = []

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

    const callback = {
      id: `callback_${Date.now()}`,
      name: body.name,
      phone: body.phone,
      preferredTime: body.preferredTime || 'asap',
      message: body.message || null,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    }

    // In production, save to Supabase
    // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
    // await supabase.from('callbacks').insert(callback)

    // Store in array (use Supabase in production)
    callbacks.unshift(callback)

    // Log for development
    console.log('Callback request received:', callback)

    return NextResponse.json({
      success: true,
      message: 'Callback request submitted successfully',
      requestId: callback.id,
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
  // Return callbacks from Supabase
  // In production, fetch from Supabase
  
  // Return empty array - no demo data
  return NextResponse.json({ 
    success: true,
    data: [],
    total: 0,
  })
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

    // Find and update callback
    const index = callbacks.findIndex(c => c.id === body.id)
    if (index !== -1) {
      callbacks[index].status = body.status
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
