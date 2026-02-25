'use client'

import { useEffect, useState } from 'react'
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText,
  ChevronDown,
  Loader2,
  Search,
  Plus,
  Eye,
  X
} from 'lucide-react'

interface EmailLog {
  id: string
  lead_id?: string
  recipient_email: string
  subject: string
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed'
  email_type: string
  template: string
  created_at: string
  sent_at?: string
  opened_at?: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  html_content: string
  category: string
}

const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Lead Confirmation',
    subject: 'Thank You for Your Enquiry - Monarchy Homes',
    html_content: '<p>Thank you for reaching out! We will contact you shortly.</p>',
    category: 'transactional',
  },
  {
    id: '2',
    name: 'Property Assessment Complete',
    subject: 'Your Free HMO Assessment is Ready',
    html_content: '<p>We have completed your property assessment...</p>',
    category: 'transactional',
  },
  {
    id: '3',
    name: 'Follow-up - No Response',
    subject: "We're Still Here to Help - Monarchy Homes",
    html_content: '<p>We noticed we haven\'t heard back from you...</p>',
    category: 'marketing',
  },
  {
    id: '4',
    name: 'Monthly Newsletter',
    subject: 'HMO Market Update & Tips - Monarchy Homes',
    html_content: '<p>Latest updates from the HMO market...</p>',
    category: 'marketing',
  },
]

export default function EmailCenterPage() {
  const [activeTab, setActiveTab] = useState<'compose' | 'logs' | 'templates'>('compose')
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    content: '',
  })
  const [sending, setSending] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (activeTab === 'logs') {
      fetchEmailLogs()
    }
  }, [activeTab])

  const fetchEmailLogs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/email')
      const data = await res.json()
      if (data.success) {
        setEmailLogs(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error)
      // Mock data for demo
      setEmailLogs([
        {
          id: '1',
          recipient_email: 'john@example.com',
          subject: 'Thank You for Your Enquiry',
          status: 'delivered',
          email_type: 'transactional',
          template: 'lead_confirmation',
          created_at: new Date().toISOString(),
          sent_at: new Date().toISOString(),
        },
        {
          id: '2',
          recipient_email: 'sarah@example.com',
          subject: 'Your HMO Assessment is Ready',
          status: 'opened',
          email_type: 'transactional',
          template: 'assessment_complete',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          sent_at: new Date(Date.now() - 86400000).toISOString(),
          opened_at: new Date(Date.now() - 43200000).toISOString(),
        },
        {
          id: '3',
          recipient_email: 'mike@example.com',
          subject: "We're Still Here to Help",
          status: 'sent',
          email_type: 'marketing',
          template: 'follow_up',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          sent_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!composeData.to || !composeData.subject || !composeData.content) {
      alert('Please fill all fields')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: composeData.to,
          subject: composeData.subject,
          html: composeData.content,
        }),
      })
      
      if (res.ok) {
        setComposeData({ to: '', subject: '', content: '' })
        setSelectedTemplate(null)
        alert('Email sent successfully!')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send email')
    } finally {
      setSending(false)
    }
  }

  const applyTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setComposeData(prev => ({
      ...prev,
      subject: template.subject,
      content: template.html_content,
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'sent':
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'opened':
      case 'clicked':
        return <Eye className="w-4 h-4 text-blue-500" />
      case 'bounced':
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Mail className="w-4 h-4 text-gray-400" />
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b flex">
          {(['compose', 'logs', 'templates'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-[#0D1B2A] border-b-2 border-[#FFC857]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'compose' && <Send className="w-4 h-4 inline mr-2" />}
              {tab === 'logs' && <Clock className="w-4 h-4 inline mr-2" />}
              {tab === 'templates' && <FileText className="w-4 h-4 inline mr-2" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Compose Tab */}
          {activeTab === 'compose' && (
            <div className="max-w-3xl">
              <div className="space-y-4">
                {/* Template Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Template
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTemplate?.id || ''}
                      onChange={(e) => {
                        const template = emailTemplates.find(t => t.id === e.target.value)
                        if (template) applyTemplate(template)
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                    >
                      <option value="">Select a template (optional)</option>
                      {emailTemplates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    type="email"
                    value={composeData.to}
                    onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="recipient@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Email subject"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={composeData.content}
                    onChange={(e) => setComposeData(prev => ({ ...prev, content: e.target.value }))}
                    rows={10}
                    placeholder="Write your email content here... (HTML supported)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSendEmail}
                    disabled={sending}
                    className="px-6 py-2.5 bg-[#0D1B2A] text-white rounded-lg font-medium hover:bg-[#1a2d42] disabled:opacity-50 flex items-center gap-2"
                  >
                    {sending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    Send Email
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="px-6 py-2.5 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div>
              {/* Search */}
              <div className="mb-4 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                />
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FFC857]" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Recipient</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(log.status)}
                              <span className="capitalize text-sm">{log.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{log.recipient_email}</td>
                          <td className="px-4 py-3 text-sm font-medium">{log.subject}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              log.email_type === 'transactional' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {log.email_type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {formatDate(log.sent_at || log.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-500">Manage your email templates</p>
                <button className="px-4 py-2 bg-[#FFC857] text-[#0D1B2A] rounded-lg font-medium hover:bg-[#e6b64e] flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  New Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emailTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#FFC857] transition-colors cursor-pointer"
                    onClick={() => {
                      applyTemplate(template)
                      setActiveTab('compose')
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        template.category === 'transactional' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{template.subject}</p>
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-[#0D1B2A] hover:underline">
                        Use Template
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPreview(false)} />
          <div className="relative bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold">Email Preview</h3>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-500">To: <span className="text-gray-900">{composeData.to || 'recipient@example.com'}</span></p>
                <p className="text-sm text-gray-500">Subject: <span className="text-gray-900 font-medium">{composeData.subject || 'No subject'}</span></p>
              </div>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: composeData.content || '<p class="text-gray-400">No content</p>' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
