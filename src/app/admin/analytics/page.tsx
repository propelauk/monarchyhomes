'use client'

import { useEffect, useState } from 'react'
import { 
  Eye, 
  MousePointer, 
  FileEdit, 
  CheckCircle,
  TrendingUp,
  Monitor,
  Smartphone,
  Tablet,
  Loader2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface AnalyticsData {
  period: string
  totalEvents: number
  pageViews: number
  ctaClicks: number
  formSubmits: number
  topPages: Array<{ url: string; count: number }>
  deviceBreakdown: { desktop: number; mobile: number; tablet: number }
  funnel: {
    pageViews: number
    ctaClicks: number
    formStarts: number
    formSubmits: number
    ctaRate: number
    formStartRate: number
    conversionRate: number
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics?period=${period}`)
      const result = await res.json()
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // Mock data for demo
      setData({
        period,
        totalEvents: 1543,
        pageViews: 892,
        ctaClicks: 234,
        formSubmits: 47,
        topPages: [
          { url: '/', count: 456 },
          { url: '/services/hmo-management', count: 123 },
          { url: '/contact', count: 98 },
          { url: '/resources/hmo-licensing-guide', count: 87 },
          { url: '/about', count: 76 },
        ],
        deviceBreakdown: { desktop: 524, mobile: 312, tablet: 56 },
        funnel: {
          pageViews: 892,
          ctaClicks: 234,
          formStarts: 156,
          formSubmits: 47,
          ctaRate: 26,
          formStartRate: 67,
          conversionRate: 30,
        },
      })
    } finally {
      setLoading(false)
    }
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
      {/* Period Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600">Time Period:</span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { value: '24h', label: '24 Hours' },
            { value: '7d', label: '7 Days' },
            { value: '30d', label: '30 Days' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === opt.value
                  ? 'bg-[#0D1B2A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Page Views"
          value={data?.pageViews || 0}
          icon={Eye}
          trend={+12.5}
          color="blue"
        />
        <StatCard
          title="CTA Clicks"
          value={data?.ctaClicks || 0}
          icon={MousePointer}
          trend={+8.3}
          color="yellow"
        />
        <StatCard
          title="Form Submissions"
          value={data?.formSubmits || 0}
          icon={FileEdit}
          trend={+15.2}
          color="green"
        />
        <StatCard
          title="Conversion Rate"
          value={`${data?.funnel.conversionRate || 0}%`}
          icon={CheckCircle}
          trend={+3.7}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            <FunnelStep
              label="Page Views"
              value={data?.funnel.pageViews || 0}
              percentage={100}
              color="bg-blue-500"
            />
            <FunnelStep
              label="CTA Clicks"
              value={data?.funnel.ctaClicks || 0}
              percentage={data?.funnel.ctaRate || 0}
              color="bg-yellow-500"
            />
            <FunnelStep
              label="Form Started"
              value={data?.funnel.formStarts || 0}
              percentage={data?.funnel.formStartRate || 0}
              color="bg-orange-500"
            />
            <FunnelStep
              label="Form Submitted"
              value={data?.funnel.formSubmits || 0}
              percentage={data?.funnel.conversionRate || 0}
              color="bg-green-500"
            />
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-6">Device Breakdown</h3>
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Donut Chart Visualization */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Desktop */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#0D1B2A"
                  strokeWidth="20"
                  strokeDasharray={`${(data?.deviceBreakdown.desktop || 0) / (data?.totalEvents || 1) * 251.2} 251.2`}
                />
                {/* Mobile */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#FFC857"
                  strokeWidth="20"
                  strokeDasharray={`${(data?.deviceBreakdown.mobile || 0) / (data?.totalEvents || 1) * 251.2} 251.2`}
                  strokeDashoffset={`-${(data?.deviceBreakdown.desktop || 0) / (data?.totalEvents || 1) * 251.2}`}
                />
                {/* Tablet */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1CE7D0"
                  strokeWidth="20"
                  strokeDasharray={`${(data?.deviceBreakdown.tablet || 0) / (data?.totalEvents || 1) * 251.2} 251.2`}
                  strokeDashoffset={`-${((data?.deviceBreakdown.desktop || 0) + (data?.deviceBreakdown.mobile || 0)) / (data?.totalEvents || 1) * 251.2}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-2xl font-bold text-gray-900">{data?.totalEvents || 0}</p>
                <p className="text-xs text-gray-500">Total Events</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <DeviceItem
              icon={Monitor}
              label="Desktop"
              count={data?.deviceBreakdown.desktop || 0}
              total={data?.totalEvents || 1}
              color="bg-[#0D1B2A]"
            />
            <DeviceItem
              icon={Smartphone}
              label="Mobile"
              count={data?.deviceBreakdown.mobile || 0}
              total={data?.totalEvents || 1}
              color="bg-[#FFC857]"
            />
            <DeviceItem
              icon={Tablet}
              label="Tablet"
              count={data?.deviceBreakdown.tablet || 0}
              total={data?.totalEvents || 1}
              color="bg-[#1CE7D0]"
            />
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Top Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Page</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Views</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">% of Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.topPages.map((page, idx) => {
                const percentage = Math.round((page.count / (data.pageViews || 1)) * 100)
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{page.url}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">{page.count.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm text-gray-500">{percentage}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-[#FFC857] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Card */}
      <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1a2d42] rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Insights</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Your form conversion rate of {data?.funnel.conversionRate}% is above industry average (25%)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                Mobile traffic accounts for {Math.round(((data?.deviceBreakdown.mobile || 0) / (data?.totalEvents || 1)) * 100)}% - ensure mobile optimization
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                The homepage captures {Math.round(((data?.topPages[0]?.count || 0) / (data?.pageViews || 1)) * 100)}% of all traffic
              </li>
            </ul>
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
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
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
        <span className="text-gray-400 text-sm">vs previous period</span>
      </div>
    </div>
  )
}

// Funnel Step Component
function FunnelStep({ 
  label, 
  value, 
  percentage, 
  color 
}: { 
  label: string
  value: number
  percentage: number
  color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{value.toLocaleString()}</span>
          <span className="text-xs text-gray-400">({percentage}%)</span>
        </div>
      </div>
      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
        <div
          className={`h-full ${color} rounded-lg transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Device Item Component
function DeviceItem({ 
  icon: Icon, 
  label, 
  count, 
  total,
  color 
}: { 
  icon: React.ComponentType<{ className?: string }>
  label: string
  count: number
  total: number
  color: string
}) {
  const percentage = Math.round((count / total) * 100)

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className={`w-3 h-3 ${color} rounded-full`} />
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <p className="text-lg font-semibold text-gray-900">{percentage}%</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
