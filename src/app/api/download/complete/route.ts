import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Demo mode - return success if no Supabase
    if (!supabase) {
      console.log('[Demo Mode] Marking download complete for token:', token)
      return NextResponse.json({ success: true })
    }

    // Mark as downloaded
    const { error } = await supabase
      .from('downloads')
      .update({
        downloaded: true,
        downloaded_at: new Date().toISOString(),
      })
      .eq('download_token', token)

    if (error) {
      console.error('Error marking download complete:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to mark download complete' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Download complete error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
