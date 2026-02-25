'use client'

import { useEffect, useState } from 'react'
import { 
  Phone, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  PhoneOff,
  Loader2,
  RefreshCw
} from 'lucide-react'

interface Callback {
  id: string
  name: string
  phone: string
  preferredTime: string
  message: string | null
  status: 'pending' | 'called' | 'no_answer' | 'completed'
  created_at: string
}

const timeLabels: Record<string, string> = {
  asap: 'As soon as possible',
  morning: 'Morning (9am - 12pm)',
  afternoon: 'Afternoon (12pm - 5pm)',
  evening: 'Evening (5pm - 8pm)',
}

const statusConfig = {
  pending: { 
    label: 'Pending', 
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock 
  },
  called: { 
    label: 'Called', 
    color: 'bg-blue-100 text-blue-800',
    icon: Phone 
  },
  no_answer: { 
    label: 'No Answer', 
    color: 'bg-red-100 text-red-800',
    icon: PhoneOff 
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle 
  },
}

export default function CallbacksPage() {
  const [callbacks, setCallbacks] = useState<Callback[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchCallbacks = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/callback')
      const data = await res.json()
      if (data.success) {
        setCallbacks(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch callbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCallbacks()
  }, [])

  const updateStatus = async (id: string, newStatus: Callback['status']) => {
    setUpdating(id)
    try {
      const res = await fetch('/api/callback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      
      if (res.ok) {
        setCallbacks(prev => 
          prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
        )
      }
    } catch (error) {
      console.error('Failed to update callback:', error)
    } finally {
      setUpdating(null)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const pendingCount = callbacks.filter(c => c.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Call Me Back Requests</h1>
          <p className="text-gray-400 mt-1">
            {pendingCount} pending request{pendingCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={fetchCallbacks}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a2942] text-white rounded-lg hover:bg-[#243448] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = callbacks.filter(c => c.status === status).length
          const Icon = config.icon
          return (
            <div
              key={status}
              className="bg-[#1a2942] rounded-xl p-4 border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{count}</p>
                  <p className="text-sm text-gray-400">{config.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Callbacks List */}
      <div className="bg-[#1a2942] rounded-xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#FFC857]" />
          </div>
        ) : callbacks.length === 0 ? (
          <div className="text-center py-12">
            <Phone className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">No callback requests yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {callbacks.map((callback) => {
              const statusInfo = statusConfig[callback.status]
              const StatusIcon = statusInfo.icon
              
              return (
                <div key={callback.id} className="p-4 md:p-6 hover:bg-white/5 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Main Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                          {callback.name}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <a 
                          href={`tel:${callback.phone}`}
                          className="flex items-center gap-1 text-[#FFC857] hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {callback.phone}
                        </a>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          {timeLabels[callback.preferredTime] || callback.preferredTime}
                        </span>
                      </div>
                      
                      {callback.message && (
                        <p className="flex items-start gap-2 text-sm text-gray-400">
                          <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {callback.message}
                        </p>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        Submitted: {formatDate(callback.created_at)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {callback.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(callback.id, 'called')}
                            disabled={updating === callback.id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Phone className="w-4 h-4" />
                            Mark Called
                          </button>
                          <button
                            onClick={() => updateStatus(callback.id, 'completed')}
                            disabled={updating === callback.id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Complete
                          </button>
                        </>
                      )}
                      {callback.status === 'called' && (
                        <>
                          <button
                            onClick={() => updateStatus(callback.id, 'no_answer')}
                            disabled={updating === callback.id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            No Answer
                          </button>
                          <button
                            onClick={() => updateStatus(callback.id, 'completed')}
                            disabled={updating === callback.id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Complete
                          </button>
                        </>
                      )}
                      {callback.status === 'no_answer' && (
                        <>
                          <button
                            onClick={() => updateStatus(callback.id, 'pending')}
                            disabled={updating === callback.id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                          >
                            <Clock className="w-4 h-4" />
                            Retry
                          </button>
                          <button
                            onClick={() => updateStatus(callback.id, 'completed')}
                            disabled={updating === callback.id}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Complete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
