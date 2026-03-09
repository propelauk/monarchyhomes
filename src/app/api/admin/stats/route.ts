import { NextRequest, NextResponse } from 'next/server'
import { getDashboardStats, getWeeklyLeadsData } from '@/lib/db'
import { createServerClient } from '@/lib/supabase'

// Calculate trend percentage
function calculateTrend(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0
  }
  return Math.round(((current - previous) / previous) * 100 * 10) / 10
}

// ============================================
// GET - Dashboard Statistics
// ============================================
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication
    
    const stats = await getDashboardStats()
    const weeklyData = await getWeeklyLeadsData()

    // Calculate trends by comparing this week to last week
    const supabase = createServerClient()
    let trends = {
      totalLeads: 0,
      newLeads: 0,
      qualified: 0,
      conversionRate: 0,
    }

    if (supabase) {
      const now = new Date()
      
      // This week
      const thisWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      // Last week (7-14 days ago)
      const lastWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14)
      const lastWeekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      // Two weeks ago (for total comparison)
      const twoWeeksAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14)

      // Get leads from last week for comparison
      const { data: lastWeekLeads } = await supabase
        .from('leads')
        .select('status, created_at')
        .gte('created_at', lastWeekStart.toISOString())
        .lt('created_at', lastWeekEnd.toISOString())

      const lastWeekNewCount = lastWeekLeads?.length || 0
      const lastWeekQualified = lastWeekLeads?.filter(l => l.status === 'qualified').length || 0

      // Get total leads up to last week for comparison
      const { count: totalLastWeek } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', thisWeekStart.toISOString())

      // Get total leads up to two weeks ago
      const { count: totalTwoWeeksAgo } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', twoWeeksAgo.toISOString())

      // Calculate previous conversion rate
      const { data: prevConverted } = await supabase
        .from('leads')
        .select('status')
        .lt('created_at', thisWeekStart.toISOString())
      
      const prevConvertedCount = prevConverted?.filter(l => l.status === 'converted').length || 0
      const prevTotalCount = prevConverted?.length || 0
      const prevConversionRate = prevTotalCount > 0 ? (prevConvertedCount / prevTotalCount) * 100 : 0

      trends = {
        totalLeads: calculateTrend(stats.totalLeads, totalLastWeek || 0),
        newLeads: calculateTrend(stats.leadsThisWeek, lastWeekNewCount),
        qualified: calculateTrend(stats.leadsByStatus.qualified, lastWeekQualified),
        conversionRate: calculateTrend(stats.conversionRate, prevConversionRate),
      }
    }

    // Get calls made today (callbacks with status 'called' or 'completed' updated today)
    let callsToday = 0
    if (supabase) {
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      
      const { count } = await supabase
        .from('callbacks')
        .select('*', { count: 'exact', head: true })
        .in('status', ['called', 'completed'])
        .gte('updated_at', todayStart.toISOString())
      
      callsToday = count || 0
    }

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        weeklyData,
        trends,
        callsToday,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
