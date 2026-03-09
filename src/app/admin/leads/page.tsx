'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  Download,
  Loader2,
  X
} from 'lucide-react'
import { Lead, LeadStatus } from '@/lib/types'

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'negotiating', label: 'Negotiating' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
]

// Wrap the main component to avoid useSearchParams SSR issues
export default function LeadsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFC857]" />
      </div>
    }>
      <LeadsPageContent />
    </Suspense>
  )
}

function LeadsPageContent() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    licensed: '',
    portfolio_owner: '',
  })
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page') || '1')
  const currentStatus = searchParams.get('status') || ''

  useEffect(() => {
    fetchLeads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentStatus, search])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '15',
      })
      
      if (currentStatus) params.set('status', currentStatus)
      if (search) params.set('search', search)
      if (filters.licensed) params.set('licensed', filters.licensed)
      if (filters.portfolio_owner) params.set('portfolio_owner', filters.portfolio_owner)

      const res = await fetch(`/api/leads?${params}`)
      const data = await res.json()
      
      if (data.success) {
        setLeads(data.data || [])
        setTotalPages(data.totalPages || 1)
        setTotal(data.total || 0)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
      // Empty state for production
      setLeads([])
      setTotal(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (res.ok) {
        setLeads(prev => prev.map(l => 
          l.id === leadId ? { ...l, status: newStatus } : l
        ))
        if (selectedLead?.id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null)
        }
      }
    } catch (error) {
      console.error('Failed to update lead:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700 border-blue-200',
      contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      qualified: 'bg-green-100 text-green-700 border-green-200',
      proposal_sent: 'bg-purple-100 text-purple-700 border-purple-200',
      negotiating: 'bg-orange-100 text-orange-700 border-orange-200',
      converted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      lost: 'bg-red-100 text-red-700 border-red-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/admin/leads?${params}`)
  }

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }
    params.set('page', '1')
    router.push(`/admin/leads?${params}`)
  }

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent outline-none"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleStatusFilter('')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                !currentStatus ? 'bg-[#0D1B2A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({total})
            </button>
            {statusOptions.slice(0, 4).map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleStatusFilter(opt.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentStatus === opt.value 
                    ? 'bg-[#0D1B2A] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License</label>
              <select
                value={filters.licensed}
                onChange={(e) => setFilters(prev => ({ ...prev, licensed: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Any</option>
                <option value="true">Has License</option>
                <option value="false">No License</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Owner</label>
              <select
                value={filters.portfolio_owner}
                onChange={(e) => setFilters(prev => ({ ...prev, portfolio_owner: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={fetchLeads}
                className="flex-1 px-4 py-2 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#1a2d42]"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setFilters({ status: '', licensed: '', portfolio_owner: '' })
                  handleStatusFilter('')
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#FFC857]" />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No leads found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Lead</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Property</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium">{lead.full_name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{lead.full_name}</p>
                            <p className="text-sm text-gray-500">{lead.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">{lead.property_postcode || '-'}</p>
                        <p className="text-xs text-gray-500">{lead.number_of_rooms ? `${lead.number_of_rooms} rooms` : '-'}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-600 capitalize">{lead.lead_source || '-'}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-600">{formatDate(lead.created_at)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={`tel:${lead.phone}`}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-green-600"
                            title="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          {lead.email && (
                            <a 
                              href={`mailto:${lead.email}`}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600"
                              title="Email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {leads.length} of {total} leads
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedLead(null)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Lead Details</h2>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#0D1B2A] flex items-center justify-center">
                    <span className="text-white text-2xl font-medium">
                      {selectedLead.full_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedLead.full_name}</h3>
                    <p className="text-gray-500">{selectedLead.lead_type}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a 
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  {selectedLead.email && (
                    <a 
                      href={`mailto:${selectedLead.email}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  )}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Phone" value={selectedLead.phone} />
                  <DetailItem label="Email" value={selectedLead.email || '-'} />
                  <DetailItem label="Preferred Contact" value={selectedLead.preferred_contact || 'Phone'} />
                  <DetailItem label="Source" value={selectedLead.lead_source || 'Website'} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Property Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Postcode" value={selectedLead.property_postcode || '-'} />
                  <DetailItem label="Property Type" value={selectedLead.property_type || '-'} />
                  <DetailItem label="Rooms" value={selectedLead.number_of_rooms?.toString() || '-'} />
                  <DetailItem label="HMO License" value={selectedLead.has_license || '-'} />
                  <DetailItem label="Occupancy" value={selectedLead.current_occupancy?.toString() || '-'} />
                  <DetailItem label="Portfolio Owner" value={selectedLead.portfolio_owner ? 'Yes' : 'No'} />
                </div>
              </div>

              {selectedLead.main_challenges && selectedLead.main_challenges.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Main Challenges</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.main_challenges.map((challenge, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.notes && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Notes</h4>
                  <p className="text-gray-600">{selectedLead.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t text-sm text-gray-500">
                <p>Created: {formatDate(selectedLead.created_at)}</p>
                <p>Updated: {formatDate(selectedLead.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-gray-900 capitalize">{value}</p>
    </div>
  )
}
