'use client'

import { useEffect, useState } from 'react'
import { 
  FileText, 
  Plus, 
  Download, 
  Trash2, 
  Edit, 
  Search,
  Eye,
  EyeOff,
  Loader2,
  Upload,
  X,
  ExternalLink,
  FolderOpen
} from 'lucide-react'

interface Resource {
  id: string
  title: string
  description?: string
  category: string
  file_url: string
  file_name?: string
  file_size?: number
  file_type?: string
  is_public: boolean
  download_count: number
  created_at: string
}

const categories = [
  { value: 'hmo_licensing', label: 'HMO Licensing' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'landlord_guides', label: 'Landlord Guides' },
  { value: 'tenant_resources', label: 'Tenant Resources' },
  { value: 'market_reports', label: 'Market Reports' },
  { value: 'general', label: 'General' },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    file_url: '',
    file_name: '',
    is_public: true,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/resources?public=false')
      const data = await res.json()
      if (data.success) {
        setResources(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error)
      // Mock data for demo
      setResources([
        {
          id: '1',
          title: 'HMO Licensing Guide 2024',
          description: 'Complete guide to obtaining and maintaining HMO licenses in Gloucestershire',
          category: 'hmo_licensing',
          file_url: '/resources/hmo-licensing-guide.pdf',
          file_name: 'hmo-licensing-guide.pdf',
          file_size: 2456000,
          file_type: 'application/pdf',
          is_public: true,
          download_count: 127,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Fire Safety Compliance Checklist',
          description: 'Essential fire safety requirements for HMO properties',
          category: 'compliance',
          file_url: '/resources/fire-safety-checklist.pdf',
          file_name: 'fire-safety-checklist.pdf',
          file_size: 890000,
          file_type: 'application/pdf',
          is_public: true,
          download_count: 89,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          title: 'Gloucestershire HMO Market Report Q4',
          description: 'Quarterly market analysis for HMO investments',
          category: 'market_reports',
          file_url: '/resources/market-report-q4.pdf',
          file_name: 'market-report-q4.pdf',
          file_size: 3200000,
          file_type: 'application/pdf',
          is_public: false,
          download_count: 34,
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.file_url) {
      alert('Title and file URL are required')
      return
    }

    setSaving(true)
    try {
      const url = editingResource 
        ? `/api/resources/${editingResource.id}` 
        : '/api/resources'
      const method = editingResource ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchResources()
        closeModal()
      }
    } catch (error) {
      console.error('Failed to save resource:', error)
      // For demo, simulate success
      closeModal()
      fetchResources()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return

    try {
      await fetch(`/api/resources/${id}`, { method: 'DELETE' })
      setResources(prev => prev.filter(r => r.id !== id))
    } catch (error) {
      console.error('Failed to delete resource:', error)
    }
  }

  const toggleVisibility = async (resource: Resource) => {
    try {
      await fetch(`/api/resources/${resource.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_public: !resource.is_public }),
      })
      setResources(prev => prev.map(r => 
        r.id === resource.id ? { ...r, is_public: !r.is_public } : r
      ))
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
    }
  }

  const openModal = (resource?: Resource) => {
    if (resource) {
      setEditingResource(resource)
      setFormData({
        title: resource.title,
        description: resource.description || '',
        category: resource.category,
        file_url: resource.file_url,
        file_name: resource.file_name || '',
        is_public: resource.is_public,
      })
    } else {
      setEditingResource(null)
      setFormData({
        title: '',
        description: '',
        category: 'general',
        file_url: '',
        file_name: '',
        is_public: true,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingResource(null)
    setFormData({
      title: '',
      description: '',
      category: 'general',
      file_url: '',
      file_name: '',
      is_public: true,
    })
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const filteredResources = resources.filter(r => {
    const matchesSearch = search === '' || 
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === '' || r.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => openModal()}
            className="px-4 py-2.5 bg-[#FFC857] text-[#0D1B2A] rounded-lg font-medium hover:bg-[#e6b64e] flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Resource
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#FFC857]" />
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No resources found</p>
          <button
            onClick={() => openModal()}
            className="mt-4 px-4 py-2 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#1a2d42]"
          >
            Add Your First Resource
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 line-clamp-1">{resource.title}</h3>
                      <span className="text-xs text-gray-500 capitalize">
                        {resource.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleVisibility(resource)}
                    className={`p-2 rounded-lg ${
                      resource.is_public 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={resource.is_public ? 'Public' : 'Private'}
                  >
                    {resource.is_public ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {resource.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{resource.description}</p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{formatFileSize(resource.file_size)}</span>
                  <span>{resource.download_count} downloads</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => openModal(resource)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  placeholder="Resource title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent resize-none"
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File URL *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.file_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Upload to Supabase Storage or enter external URL
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={formData.is_public}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_public: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-[#FFC857] focus:ring-[#FFC857]"
                />
                <label htmlFor="is_public" className="text-sm text-gray-700">
                  Make publicly accessible (visible on website)
                </label>
              </div>
            </div>

            <div className="border-t p-4 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#1a2d42] disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {editingResource ? 'Save Changes' : 'Add Resource'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
