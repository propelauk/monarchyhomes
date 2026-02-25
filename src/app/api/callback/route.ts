import { NextResponse } from 'next/server'

// Demo data storage (in production, use Supabase)
const demoCallbacks: Array<{
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

    // Store in demo array
    demoCallbacks.unshift(callback)

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
  // Return demo callbacks for admin dashboard
  // In production, fetch from Supabase
  
  // Add some demo data if empty
  if (demoCallbacks.length === 0) {
    demoCallbacks.push(
      {
        id: 'callback_demo_1',
        name: 'James Wilson',
        phone: '07123456789',
        preferredTime: 'asap',
        message: 'I have a 5-bed property in Gloucester',
        status: 'pending',
        created_at: new Date().toISOString(),
      },
      {
        id: 'callback_demo_2',
        name: 'Sarah Brown',
        phone: '07987654321',
        preferredTime: 'morning',
        message: null,
        status: 'pending',
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'callback_demo_3',
        name: 'Michael Taylor',
        phone: '07555123456',
        preferredTime: 'afternoon',
        message: 'Looking for HMO management',
        status: 'called',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    )
  }
  
  return NextResponse.json({ 
    success: true,
    data: demoCallbacks,
    total: demoCallbacks.length,
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
    const index = demoCallbacks.findIndex(c => c.id === body.id)
    if (index !== -1) {
      demoCallbacks[index].status = body.status
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
