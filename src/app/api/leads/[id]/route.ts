import { NextRequest, NextResponse } from 'next/server'
import { getLead, updateLead, deleteLead, getLeadActivities, createLeadActivity } from '@/lib/db'

// ============================================
// GET - Get Single Lead with Activities
// ============================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const lead = await getLead(id)
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    const activities = await getLeadActivities(id)

    return NextResponse.json({
      success: true,
      data: { ...lead, activities },
    })
  } catch (error) {
    console.error('Get lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lead' },
      { status: 500 }
    )
  }
}

// ============================================
// PUT - Update Lead
// ============================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // In production, get admin user from session
    const performedBy = body.performed_by || undefined

    // Only allow specific fields to be updated
    const allowedFields = ['status', 'notes', 'tags', 'assigned_to']
    const updateData: Record<string, unknown> = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    const lead = await updateLead(id, updateData, performedBy)

    return NextResponse.json({
      success: true,
      data: lead,
    })
  } catch (error) {
    console.error('Update lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

// ============================================
// DELETE - Delete Lead (Admin only)
// ============================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // In production, verify admin role
    // const session = await getServerSession()
    // if (session?.user?.role !== 'admin') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }

    await deleteLead(id)

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    })
  } catch (error) {
    console.error('Delete lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
