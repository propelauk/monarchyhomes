import { NextResponse } from 'next/server'

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

    // In production, save to Supabase
    // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
    // await supabase.from('downloads').insert({
    //   name: body.name,
    //   email: body.email,
    //   phone: body.phone,
    //   resource: body.resource,
    //   created_at: new Date().toISOString(),
    // })

    // In production, send email with download link via Resend/SendGrid
    // await sendEmail({
    //   to: body.email,
    //   subject: 'Your HMO Compliance Checklist - Monarchy Homes',
    //   template: 'resource-download',
    //   data: { 
    //     name: body.name,
    //     downloadUrl: `https://monarchyhomes.co.uk/downloads/${body.resource}.pdf`
    //   }
    // })

    // Log for development
    console.log('Download request received:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      resource: body.resource,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Download request successful',
      downloadUrl: `/downloads/${body.resource}.pdf`,
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
