import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Resource configuration
const RESOURCES: Record<string, { title: string; filename: string; description: string }> = {
  'renters-rights-act': {
    title: 'The Renters\' Rights Act Explained',
    filename: 'The Renters Rights Act explained.pdf',
    description: 'Your comprehensive guide to understanding the new Renters\' Rights Act',
  },
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Demo mode - return success if no Supabase
    if (!supabase) {
      console.log('[Demo Mode] Verifying download token:', token)
      return NextResponse.json({
        success: true,
        resource: RESOURCES['renters-rights-act'],
        name: 'Demo User',
      })
    }

    // Verify token in database
    const { data: download, error } = await supabase
      .from('downloads')
      .select('*')
      .eq('download_token', token)
      .single()

    if (error || !download) {
      return NextResponse.json({
        success: false,
        error: 'Invalid download link',
      })
    }

    // Check if expired
    if (new Date(download.expires_at) < new Date()) {
      return NextResponse.json({
        success: false,
        expired: true,
        error: 'Download link has expired',
      })
    }

    // Get resource info
    const resource = RESOURCES[download.resource]
    if (!resource) {
      return NextResponse.json({
        success: false,
        error: 'Resource not found',
      })
    }

    return NextResponse.json({
      success: true,
      resource,
      name: download.name,
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}
