import { Lead, CreateLeadRequest, UpdateLeadRequest, LeadFilters, PaginatedResponse, DashboardStats, LeadStatus, LeadActivity } from './types'
import { createServerClient } from './supabase'

// ============================================
// LEADS DATABASE OPERATIONS
// ============================================

export async function createLead(data: CreateLeadRequest): Promise<Lead> {
  const supabase = createServerClient()
  
  // Demo mode - return mock lead
  if (!supabase) {
    console.log('[DEMO MODE] Creating lead:', data.full_name)
    const demoLead: Lead = {
      id: `demo-${Date.now()}`,
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      property_postcode: data.property_postcode || null,
      property_address: data.property_address || null,
      property_type: data.property_type || null,
      ownership_status: data.ownership_status || null,
      property_timeline: data.property_timeline || null,
      number_of_rooms: data.number_of_rooms || null,
      has_license: data.has_license || null,
      licensed: data.has_license === 'yes',
      current_occupancy: data.current_occupancy || null,
      current_management: data.current_management || null,
      current_monthly_income: data.current_monthly_income || null,
      portfolio_owner: data.portfolio_owner || false,
      main_challenges: data.main_challenges || null,
      preferred_contact: data.preferred_contact || 'email',
      lead_source: data.lead_source || 'website',
      lead_type: data.lead_type || 'assessment',
      status: 'new',
      tags: null,
      notes: null,
      assigned_to: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    return demoLead
  }
  
  const leadData = {
    ...data,
    licensed: data.has_license === 'yes',
    status: 'new' as LeadStatus,
    lead_source: data.lead_source || 'website',
    lead_type: data.lead_type || 'assessment',
  }

  const { data: lead, error } = await supabase
    .from('leads')
    .insert(leadData)
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    throw new Error(`Failed to create lead: ${error.message}`)
  }

  // Track form submission in analytics
  supabase.from('analytics_events').insert({
    event_type: 'form_submit',
    page_title: `Lead Form: ${data.lead_type || 'assessment'}`,
    metadata: { 
      lead_type: data.lead_type || 'assessment', 
      lead_source: data.lead_source || 'website',
      has_property_postcode: !!data.property_postcode,
    },
    created_at: new Date().toISOString(),
  }).then(({ error }) => {
    if (error) console.error('Analytics tracking error:', error)
  })

  return lead
}

export async function getLead(id: string): Promise<Lead | null> {
  const supabase = createServerClient()
  
  // No Supabase - return null
  if (!supabase) {
    return null
  }
  
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(`Failed to get lead: ${error.message}`)
  }

  return data
}

export async function getLeads(filters: LeadFilters = {}): Promise<PaginatedResponse<Lead>> {
  const supabase = createServerClient()
  const { status, licensed, portfolio_owner, start_date, end_date, search, page = 1, limit = 25 } = filters
  
  // No Supabase - return empty
  if (!supabase) {
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    }
  }

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Apply filters
  if (status) {
    query = query.eq('status', status)
  }
  if (licensed !== undefined) {
    query = query.eq('licensed', licensed)
  }
  if (portfolio_owner !== undefined) {
    query = query.eq('portfolio_owner', portfolio_owner)
  }
  if (start_date) {
    query = query.gte('created_at', start_date)
  }
  if (end_date) {
    query = query.lte('created_at', end_date)
  }
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,property_postcode.ilike.%${search}%,email.ilike.%${search}%`)
  }

  // Pagination
  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Failed to get leads: ${error.message}`)
  }

  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function updateLead(id: string, data: UpdateLeadRequest, performedBy?: string): Promise<Lead> {
  const supabase = createServerClient()
  
  // No Supabase - throw error
  if (!supabase) {
    throw new Error('Database not configured')
  }

  // Get current lead for activity logging
  const currentLead = await getLead(id)
  
  const { data: lead, error } = await supabase
    .from('leads')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update lead: ${error.message}`)
  }

  // Log activity if status changed
  if (data.status && currentLead && currentLead.status !== data.status) {
    await createLeadActivity({
      lead_id: id,
      activity_type: 'status_change',
      description: `Status changed from ${currentLead.status} to ${data.status}`,
      old_value: currentLead.status,
      new_value: data.status,
      performed_by: performedBy,
    })
  }

  // Log activity if notes added
  if (data.notes && currentLead && currentLead.notes !== data.notes) {
    await createLeadActivity({
      lead_id: id,
      activity_type: 'note_added',
      description: 'Note was added',
      new_value: data.notes,
      performed_by: performedBy,
    })
  }

  return lead
}

export async function deleteLead(id: string): Promise<void> {
  const supabase = createServerClient()
  
  // Demo mode
  if (!supabase) {
    console.log('[DEMO MODE] Deleting lead:', id)
    return
  }

  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete lead: ${error.message}`)
  }
}

// ============================================
// LEAD ACTIVITIES
// ============================================

interface CreateActivityData {
  lead_id: string
  activity_type: string
  description?: string
  old_value?: string
  new_value?: string
  performed_by?: string
}

export async function createLeadActivity(data: CreateActivityData): Promise<LeadActivity> {
  const supabase = createServerClient()
  
  // Demo mode
  if (!supabase) {
    console.log('[DEMO MODE] Creating activity:', data.activity_type)
    return {
      id: `activity-${Date.now()}`,
      ...data,
      description: data.description || '',
      created_at: new Date().toISOString(),
    } as LeadActivity
  }

  const { data: activity, error } = await supabase
    .from('lead_activities')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error creating activity:', error)
    throw new Error(`Failed to create activity: ${error.message}`)
  }

  return activity
}

export async function getLeadActivities(leadId: string): Promise<LeadActivity[]> {
  const supabase = createServerClient()
  
  // No Supabase - return empty
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get activities: ${error.message}`)
  }

  return data || []
}

// ============================================
// DASHBOARD STATS
// ============================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createServerClient()
  
  // No Supabase - return empty stats
  if (!supabase) {
    return {
      totalLeads: 0,
      leadsToday: 0,
      leadsThisWeek: 0,
      leadsThisMonth: 0,
      conversionRate: 0,
      leadsByStatus: {
        new: 0,
        contacted: 0,
        qualified: 0,
        proposal_sent: 0,
        negotiating: 0,
        converted: 0,
        lost: 0,
      },
      licensedCount: 0,
      unlicensedCount: 0,
      portfolioOwnersCount: 0,
      averageRooms: 0,
    }
  }
  
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  // Get all leads
  const { data: allLeads, error } = await supabase
    .from('leads')
    .select('status, licensed, portfolio_owner, number_of_rooms, created_at')

  if (error) {
    throw new Error(`Failed to get stats: ${error.message}`)
  }

  const leads = allLeads || []
  const totalLeads = leads.length

  // Calculate stats
  const leadsToday = leads.filter(l => l.created_at >= todayStart).length
  const leadsThisWeek = leads.filter(l => l.created_at >= weekStart).length
  const leadsThisMonth = leads.filter(l => l.created_at >= monthStart).length

  // Status breakdown
  const leadsByStatus: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal_sent: 0,
    negotiating: 0,
    converted: 0,
    lost: 0,
  }
  leads.forEach(l => {
    if (l.status in leadsByStatus) {
      leadsByStatus[l.status as LeadStatus]++
    }
  })

  // Conversion rate
  const conversionRate = totalLeads > 0 
    ? (leadsByStatus.converted / totalLeads) * 100 
    : 0

  // Licensed breakdown
  const licensedCount = leads.filter(l => l.licensed).length
  const unlicensedCount = leads.filter(l => !l.licensed).length

  // Portfolio owners
  const portfolioOwnersCount = leads.filter(l => l.portfolio_owner).length

  // Average rooms
  const leadsWithRooms = leads.filter(l => l.number_of_rooms)
  const averageRooms = leadsWithRooms.length > 0
    ? leadsWithRooms.reduce((sum, l) => sum + (l.number_of_rooms || 0), 0) / leadsWithRooms.length
    : 0

  return {
    totalLeads,
    leadsToday,
    leadsThisWeek,
    leadsThisMonth,
    conversionRate: Math.round(conversionRate * 10) / 10,
    leadsByStatus,
    licensedCount,
    unlicensedCount,
    portfolioOwnersCount,
    averageRooms: Math.round(averageRooms * 10) / 10,
  }
}

// ============================================
// WEEKLY LEADS DATA FOR CHARTS
// ============================================

export async function getWeeklyLeadsData(): Promise<{ date: string; count: number }[]> {
  const supabase = createServerClient()
  
  // No Supabase - return empty data
  if (!supabase) {
    return []
  }
  
  // Get last 12 weeks of data
  const weeksAgo = new Date()
  weeksAgo.setDate(weeksAgo.getDate() - 84)

  const { data, error } = await supabase
    .from('leads')
    .select('created_at')
    .gte('created_at', weeksAgo.toISOString())

  if (error) {
    throw new Error(`Failed to get weekly data: ${error.message}`)
  }

  // Group by week
  const weeklyData: Record<string, number> = {}
  const leads = data || []

  leads.forEach(lead => {
    const date = new Date(lead.created_at)
    const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay())
    const key = weekStart.toISOString().split('T')[0]
    weeklyData[key] = (weeklyData[key] || 0) + 1
  })

  // Convert to array sorted by date
  return Object.entries(weeklyData)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
