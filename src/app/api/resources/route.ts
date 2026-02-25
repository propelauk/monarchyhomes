import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Demo resources data
const demoResources = [
  {
    id: 'resource-1',
    title: 'HMO Landlord Checklist',
    description: 'Complete checklist for HMO property management compliance',
    category: 'guide',
    file_url: '/downloads/hmo-checklist.pdf',
    file_name: 'hmo-checklist.pdf',
    is_public: true,
    download_count: 127,
    created_at: new Date().toISOString(),
  },
  {
    id: 'resource-2',
    title: 'Rent Guarantee Explained',
    description: 'Understanding guaranteed rent schemes for landlords',
    category: 'guide',
    file_url: '/downloads/rent-guarantee.pdf',
    file_name: 'rent-guarantee.pdf',
    is_public: true,
    download_count: 89,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'resource-3',
    title: 'HMO Licensing Requirements 2024',
    description: 'Updated licensing requirements for HMO properties',
    category: 'compliance',
    file_url: '/downloads/hmo-licensing-2024.pdf',
    file_name: 'hmo-licensing-2024.pdf',
    is_public: true,
    download_count: 203,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

// ============================================
// GET - List Resources
// ============================================
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const publicOnly = searchParams.get('public') !== 'false'

    // Demo mode
    if (!supabase) {
      let resources = [...demoResources]
      if (category) {
        resources = resources.filter(r => r.category === category)
      }
      return NextResponse.json({
        success: true,
        data: resources,
      })
    }

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

    // Demo mode
    if (!supabase) {
      console.log('[DEMO MODE] Creating resource:', body.title)
      return NextResponse.json({
        success: true,
        data: {
          id: `resource-${Date.now()}`,
          ...body,
          download_count: 0,
          created_at: new Date().toISOString(),
        },
      })
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
