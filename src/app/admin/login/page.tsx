'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Login failed')
        return
      }

      // Store auth state
      localStorage.setItem('monarchy_admin_auth', 'true')
      localStorage.setItem('monarchy_admin_name', data.data.name)
      localStorage.setItem('monarchy_admin_email', data.data.email)
      
      router.push('/admin')
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FFC857] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Crown className="w-10 h-10 text-[#0D1B2A]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Monarchy Homes</h1>
          <p className="text-gray-400">Admin Dashboard Login</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent outline-none transition-all"
                placeholder="admin@monarchyhomes.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent outline-none transition-all pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#0D1B2A] text-white py-3 rounded-lg font-medium hover:bg-[#1a2d42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Protected area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
