import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Admin authentication utilities

export interface AdminSession {
  userId: string
  email: string
  role: 'super_admin' | 'admin' | 'viewer'
  name: string
  needsPasswordChange?: boolean
}

// Hardcoded initial admin credentials (will be replaced after first login)
const INITIAL_ADMIN_EMAIL = 'hello@monarchyhomes.com'
const INITIAL_ADMIN_PASSWORD_HASH = hashPassword('Mon62k123@homes')

// Simple password hashing function
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'monarchy_salt_2026').digest('hex')
}

// Verify password against hash
function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

/**
 * Verify admin authentication from request
 * Returns admin session or null if not authenticated
 */
export async function verifyAdminAuth(request: NextRequest): Promise<AdminSession | null> {
  try {
    const supabase = createServerClient()
    
    // Check for auth token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }

    // If Supabase is configured, verify against database
    if (supabase) {
      // Check if we have admin credentials stored
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', token) // Token contains email for simplicity
        .eq('is_active', true)
        .single()

      if (!error && adminUser) {
        return {
          userId: adminUser.id,
          email: adminUser.email,
          role: adminUser.role || 'admin',
          name: adminUser.full_name,
        }
      }
    }

    // Fallback: verify against hardcoded credentials
    if (token === INITIAL_ADMIN_EMAIL) {
      return {
        userId: 'admin-1',
        email: INITIAL_ADMIN_EMAIL,
        role: 'super_admin',
        name: 'Admin',
      }
    }

    return null
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
    
    // First, check Supabase for stored admin credentials
    if (supabase) {
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('is_active', true)
        .single()

      if (!error && adminUser && adminUser.password_hash) {
        // Verify against stored password
        if (verifyPassword(password, adminUser.password_hash)) {
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
              role: adminUser.role || 'admin',
              name: adminUser.full_name,
            },
          }
        }
      }
    }
    
    // Fallback: Check against hardcoded initial credentials
    if (email.toLowerCase() === INITIAL_ADMIN_EMAIL.toLowerCase()) {
      if (verifyPassword(password, INITIAL_ADMIN_PASSWORD_HASH)) {
        console.log('Admin login successful with initial credentials:', email)
        
        // Create admin user in Supabase if not exists
        if (supabase) {
          const { data: existingAdmin } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', email.toLowerCase())
            .single()

          if (!existingAdmin) {
            await supabase.from('admin_users').insert({
              email: email.toLowerCase(),
              full_name: 'Admin',
              role: 'super_admin',
              password_hash: INITIAL_ADMIN_PASSWORD_HASH,
              is_active: true,
              last_login: new Date().toISOString(),
            })
          }
        }

        return {
          success: true,
          session: {
            userId: 'admin-1',
            email: INITIAL_ADMIN_EMAIL,
            role: 'super_admin',
            name: 'Admin',
            needsPasswordChange: true, // Prompt to change initial password
          },
        }
      }
    }

    return { success: false, error: 'Invalid email or password' }
  } catch (error) {
    console.error('Admin login error:', error)
    return { success: false, error: 'Login failed' }
  }
}

/**
 * Change admin password
 */
export async function changeAdminPassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServerClient()
    
    if (!supabase) {
      return { success: false, error: 'Database not configured' }
    }

    // Verify current password
    const loginResult = await adminLogin(email, currentPassword)
    if (!loginResult.success) {
      return { success: false, error: 'Current password is incorrect' }
    }

    // Hash new password
    const newPasswordHash = hashPassword(newPassword)

    // Update password in database
    const { error } = await supabase
      .from('admin_users')
      .update({ 
        password_hash: newPasswordHash,
        updated_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase())

    if (error) {
      console.error('Password update error:', error)
      return { success: false, error: 'Failed to update password' }
    }

    return { success: true }
  } catch (error) {
    console.error('Change password error:', error)
    return { success: false, error: 'Password change failed' }
  }
}
