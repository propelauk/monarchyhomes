import { NextRequest, NextResponse } from 'next/server'
import { getDashboardStats, getWeeklyLeadsData } from '@/lib/db'

// ============================================
// GET - Dashboard Statistics
// ============================================
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication
    
    const stats = await getDashboardStats()
    const weeklyData = await getWeeklyLeadsData()

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        weeklyData,
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
