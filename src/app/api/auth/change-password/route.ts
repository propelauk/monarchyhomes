import { NextRequest, NextResponse } from 'next/server'
import { changeAdminPassword } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !body.currentPassword || !body.newPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate new password
    if (body.newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const result = await changeAdminPassword(
      body.email,
      body.currentPassword,
      body.newPassword
    )

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to change password' },
      { status: 500 }
    )
  }
}
