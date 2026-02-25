'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Crown,
  Phone,
  Bell
} from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/email', label: 'Email Center', icon: Mail },
  { href: '/admin/resources', label: 'Resources', icon: FileText },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminName, setAdminName] = useState('Admin')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // In production, check auth state here
    // If not authenticated, redirect to login
    const isAuth = localStorage.getItem('monarchy_admin_auth')
    if (!isAuth && pathname !== '/admin/login') {
      // For demo purposes, we'll allow access
      // router.push('/admin/login')
    }
    
    const storedName = localStorage.getItem('monarchy_admin_name')
    if (storedName) {
      setAdminName(storedName)
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('monarchy_admin_auth')
    localStorage.removeItem('monarchy_admin_name')
    router.push('/admin/login')
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0D1B2A] transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFC857] rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-[#0D1B2A]" />
              </div>
              <div>
                <span className="text-white font-bold text-lg">Monarchy</span>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname?.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-[#FFC857] text-[#0D1B2A] font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Quick Actions</p>
              <a 
                href="tel:01452452308"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#FFC857] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Lead
              </a>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFC857]/20 flex items-center justify-center">
                  <span className="text-[#FFC857] font-medium">
                    {adminName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{adminName}</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 capitalize">
                {pathname === '/admin' 
                  ? 'Dashboard Overview' 
                  : pathname?.replace('/admin/', '').replace('-', ' ') || 'Dashboard'
                }
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link 
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Site →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-4 py-3 text-center text-sm text-gray-500">
          Monarchy Homes Admin © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
