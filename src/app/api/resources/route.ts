import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// ============================================
// GET - List Resources
// ============================================
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const publicOnly = searchParams.get('public') !== 'false'

    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (publicOnly) {
      query = query.eq('is_public', true)
    }
    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error) {
    console.error('Get resources error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

// ============================================
// POST - Create Resource (Admin only)
// ============================================
export async function POST(request: NextRequest) {
  try {
    // In production, verify admin authentication
    
    const supabase = createServerClient()
    const body = await request.json()

    // Validate
    if (!body.title || !body.file_url) {
      return NextResponse.json(
        { success: false, error: 'Title and file URL are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('resources')
      .insert({
        title: body.title,
        description: body.description || null,
        category: body.category || 'general',
        file_url: body.file_url,
        file_name: body.file_name || null,
        file_size: body.file_size || null,
        file_type: body.file_type || null,
        is_public: body.is_public !== false,
        created_by: body.created_by || null,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Create resource error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}
