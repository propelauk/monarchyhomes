import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key
// Use this only in API routes and server components
// Returns null if environment variables are not configured
export function createServerClient(): SupabaseClient | null {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase environment variables not configured - running in demo mode')
    return null
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Client-side Supabase client with anon key
// Use this in client components
// Returns null if environment variables are not configured
export function createBrowserClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured - running in demo mode')
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
