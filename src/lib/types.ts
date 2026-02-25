// Database Types for Monarchy Homes

export interface Lead {
  id: string
  full_name: string
  phone: string
  email: string | null
  property_postcode: string | null
  property_address: string | null
  property_type: string | null
  ownership_status: string | null
  property_timeline: string | null
  number_of_rooms: number | null
  licensed: boolean
  has_license: string | null
  current_occupancy: number | null
  current_management: string | null
  current_monthly_income: number | null
  portfolio_owner: boolean
  main_challenges: string[] | null
  preferred_contact: string
  lead_source: string
  lead_type: string
  status: LeadStatus
  tags: string[] | null
  notes: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiating' | 'converted' | 'lost'

export interface AdminUser {
  id: string
  full_name: string
  email: string
  role: 'admin' | 'manager'
  avatar_url: string | null
  is_active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

export interface EmailLog {
  id: string
  lead_id: string | null
  recipient_email: string
  recipient_name: string | null
  subject: string
  template: string | null
  email_type: 'transactional' | 'broadcast' | 'notification'
  status: 'pending' | 'sent' | 'failed' | 'bounced'
  error_message: string | null
  metadata: Record<string, unknown> | null
  sent_by: string | null
  created_at: string
}

export interface Resource {
  id: string
  title: string
  description: string | null
  category: string
  file_url: string
  file_name: string | null
  file_size: number | null
  file_type: string | null
  download_count: number
  is_public: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface AnalyticsEvent {
  id: string
  event_type: string
  page_url: string | null
  page_title: string | null
  session_id: string | null
  visitor_id: string | null
  referrer: string | null
  user_agent: string | null
  device_type: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface LeadActivity {
  id: string
  lead_id: string
  activity_type: string
  description: string | null
  old_value: string | null
  new_value: string | null
  performed_by: string | null
  created_at: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body_html: string
  body_text: string | null
  variables: string[] | null
  is_active: boolean
  created_at: string
  updated_at: string
}

// API Request/Response Types
export interface CreateLeadRequest {
  full_name: string
  phone: string
  email?: string
  property_postcode?: string
  property_address?: string
  property_type?: string
  ownership_status?: string
  property_timeline?: string
  number_of_rooms?: number
  has_license?: string
  current_occupancy?: number
  current_management?: string
  current_monthly_income?: number
  portfolio_owner?: boolean
  main_challenges?: string[]
  preferred_contact?: string
  lead_source?: string
  lead_type?: string
}

export interface UpdateLeadRequest {
  status?: LeadStatus
  notes?: string
  tags?: string[]
  assigned_to?: string
}

export interface LeadFilters {
  status?: LeadStatus
  licensed?: boolean
  portfolio_owner?: boolean
  start_date?: string
  end_date?: string
  search?: string
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DashboardStats {
  totalLeads: number
  leadsToday: number
  leadsThisWeek: number
  leadsThisMonth: number
  conversionRate: number
  leadsByStatus: Record<LeadStatus, number>
  licensedCount: number
  unlicensedCount: number
  portfolioOwnersCount: number
  averageRooms: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
