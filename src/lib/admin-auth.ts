import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Admin authentication utilities

export interface AdminSession {
  userId: string
  email: string
  role: 'super_admin' | 'admin' | 'viewer'
  name: string
}

/**
 * Verify admin authentication from request
 * Returns admin session or null if not authenticated
 */
export async function verifyAdminAuth(request: NextRequest): Promise<AdminSession | null> {
  try {
    // Get auth token from header or cookie
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }

    const supabase = createServerClient()
    
    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return null
    }

    // Check if user is an admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      return null
    }

    return {
      userId: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      name: adminUser.full_name,
    }
  } catch (error) {
    console.error('Admin auth verification error:', error)
    return null
  }
}

/**
 * Check if admin has required role
 */
export function hasRole(session: AdminSession, requiredRoles: Array<'super_admin' | 'admin' | 'viewer'>): boolean {
  return requiredRoles.includes(session.role)
}

/**
 * Create protected API handler wrapper
 */
export function withAdminAuth(
  handler: (request: NextRequest, session: AdminSession) => Promise<NextResponse>,
  requiredRoles?: Array<'super_admin' | 'admin' | 'viewer'>
) {
  return async (request: NextRequest) => {
    const session = await verifyAdminAuth(request)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (requiredRoles && !hasRole(session, requiredRoles)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    return handler(request, session)
  }
}

/**
 * Admin login handler
 */
export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  try {
    const supabase = createServerClient()
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Check if user is an admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', data.user.id)
      .eq('is_active', true)
      .single()

    if (adminError || !adminUser) {
      return { success: false, error: 'Not authorized as admin' }
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id)

    return {
      success: true,
      session: {
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.full_name,
      },
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return { success: false, error: 'Login failed' }
  }
}
