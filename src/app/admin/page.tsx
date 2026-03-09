'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react'

interface DashboardStats {
  totalLeads: number
  newLeads: number
  leadsThisWeek: number
  contacted: number
  qualified: number
  converted: number
  conversionRate: number
  weeklyData: Array<{ date: string; count: number }>
  leadsByStatus: {
    new: number
    contacted: number
    qualified: number
    proposal_sent: number
    negotiating: number
    converted: number
    lost: number
  }
  trends: {
    totalLeads: number
    newLeads: number
    qualified: number
    conversionRate: number
  }
}

interface RecentLead {
  id: string
  full_name: string
  phone: string
  email?: string
  status: string
  lead_type: string
  created_at: string
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsRes = await fetch('/api/admin/stats')
      const statsData = await statsRes.json()
      if (statsData.success) {
        setStats(statsData.data)
      }

      // Fetch recent leads
      const leadsRes = await fetch('/api/leads?limit=5')
      const leadsData = await leadsRes.json()
      if (leadsData.success) {
        setRecentLeads(leadsData.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      // Set empty state - no mock data for production
      setStats({
        totalLeads: 0,
        newLeads: 0,
        leadsThisWeek: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        conversionRate: 0,
        weeklyData: [],
        leadsByStatus: {
          new: 0,
          contacted: 0,
          qualified: 0,
          proposal_sent: 0,
          negotiating: 0,
          converted: 0,
          lost: 0,
        },
        trends: {
          totalLeads: 0,
          newLeads: 0,
          qualified: 0,
          conversionRate: 0,
        }
      })
      setRecentLeads([])
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      qualified: 'bg-green-100 text-green-700',
      proposal_sent: 'bg-purple-100 text-purple-700',
      negotiating: 'bg-orange-100 text-orange-700',
      converted: 'bg-emerald-100 text-emerald-700',
      lost: 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFC857]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={stats?.totalLeads || 0}
          icon={Users}
          trend={stats?.trends?.totalLeads ?? 0}
          color="blue"
        />
        <StatCard
          title="New This Week"
          value={stats?.leadsThisWeek || 0}
          icon={Clock}
          trend={stats?.trends?.newLeads ?? 0}
          color="yellow"
        />
        <StatCard
          title="Qualified"
          value={stats?.leadsByStatus?.qualified || 0}
          icon={CheckCircle}
          trend={stats?.trends?.qualified ?? 0}
          color="green"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats?.conversionRate || 0}%`}
          icon={TrendingUp}
          trend={stats?.trends?.conversionRate ?? 0}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Leads Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Lead Activity</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {stats?.weeklyData?.map((day, idx) => {
              const maxCount = Math.max(...(stats.weeklyData?.map(d => d.count) || [1]))
              const height = (day.count / maxCount) * 100
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-[#FFC857] rounded-t-lg transition-all hover:bg-[#e6b64e]"
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                  <span className="text-xs text-gray-500">{day.date}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Lead Status Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Lead Status Breakdown</h3>
          <div className="space-y-4">
            <StatusBar label="New" value={stats?.newLeads || 0} total={stats?.totalLeads || 1} color="bg-blue-500" />
            <StatusBar label="Contacted" value={stats?.contacted || 0} total={stats?.totalLeads || 1} color="bg-yellow-500" />
            <StatusBar label="Qualified" value={stats?.qualified || 0} total={stats?.totalLeads || 1} color="bg-green-500" />
            <StatusBar label="Converted" value={stats?.converted || 0} total={stats?.totalLeads || 1} color="bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Leads</h3>
            <Link 
              href="/admin/leads"
              className="text-sm text-[#0D1B2A] hover:text-[#FFC857] flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center">
                    <span className="text-white font-medium">
                      {lead.full_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{lead.full_name}</p>
                    <p className="text-sm text-gray-500">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                  <span className="text-sm text-gray-400">{formatTime(lead.created_at)}</span>
                  <div className="flex items-center gap-2">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-green-600"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    {lead.email && (
                      <a 
                        href={`mailto:${lead.email}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No leads yet. They will appear here when submitted.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              href="/admin/leads?status=new"
              className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Review New Leads</span>
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {stats?.newLeads || 0}
              </span>
            </Link>
            <Link 
              href="/admin/email"
              className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Send Follow-up</span>
            </Link>
            <Link 
              href="/admin/resources"
              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Update Resources</span>
            </Link>
          </div>

          {/* Today's Summary */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-3">Today&apos;s Summary</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-[#0D1B2A]">3</p>
                <p className="text-xs text-gray-500">New Leads</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">2</p>
                <p className="text-xs text-gray-500">Calls Made</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color 
}: { 
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend: number
  color: 'blue' | 'yellow' | 'green' | 'purple'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        {trend > 0 ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
        <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
          {Math.abs(trend)}%
        </span>
        <span className="text-gray-400 text-sm">vs last week</span>
      </div>
    </div>
  )
}

// Status Bar Component
function StatusBar({ 
  label, 
  value, 
  total, 
  color 
}: { 
  label: string
  value: number
  total: number
  color: string
}) {
  const percentage = (value / total) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
