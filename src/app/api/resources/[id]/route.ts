import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Demo resource data
const demoResource = {
  id: 'demo-resource-1',
  title: 'HMO Landlord Checklist',
  description: 'Complete checklist for HMO property management',
  category: 'guide',
  file_url: '/downloads/hmo-checklist.pdf',
  file_name: 'hmo-checklist.pdf',
  is_public: true,
  download_count: 45,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// ============================================
// GET - Get Single Resource
// ============================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    // Demo mode
    if (!supabase) {
      return NextResponse.json({
        success: true,
        data: { ...demoResource, id },
      })
    }

    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Resource not found' },
          { status: 404 }
        )
      }
      throw new Error(error.message)
    }

    // Increment download count
    await supabase
      .from('resources')
      .update({ download_count: (data.download_count || 0) + 1 })
      .eq('id', id)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Get resource error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resource' },
      { status: 500 }
    )
  }
}

// ============================================
// PUT - Update Resource (Admin only)
// ============================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()
    const body = await request.json()

    // Demo mode
    if (!supabase) {
      console.log('[DEMO MODE] Updating resource:', id, body)
      return NextResponse.json({
        success: true,
        data: { ...demoResource, id, ...body },
      })
    }

    const allowedFields = ['title', 'description', 'category', 'file_url', 'file_name', 'is_public']
    const updateData: Record<string, unknown> = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    const { data, error } = await supabase
      .from('resources')
      .update(updateData)
      .eq('id', id)
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
    console.error('Update resource error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update resource' },
      { status: 500 }
    )
  }
}

// ============================================
// DELETE - Delete Resource (Admin only)
// ============================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    // Demo mode
    if (!supabase) {
      console.log('[DEMO MODE] Deleting resource:', id)
      return NextResponse.json({
        success: true,
        message: 'Resource deleted successfully',
      })
    }

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully',
    })
  } catch (error) {
    console.error('Delete resource error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete resource' },
      { status: 500 }
    )
  }
}
