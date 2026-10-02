import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get user to check if admin
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin (you'll need to set this in user metadata)
    // For now, we'll assume all authenticated users can access this
    // In production, verify the is_admin claim

    // ⚡ BOLT OPTIMIZATION: Concurrently fetch active and total subscriber counts via Promise.all to avoid sequential database round trips.
    const [activeResult, totalResult] = await Promise.all([
      supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true }),
    ])

    if (activeResult.error) throw activeResult.error
    if (totalResult.error) throw totalResult.error

    const activeCount = activeResult.count
    const totalCount = totalResult.count

    return NextResponse.json({
      activeSubscribers: activeCount || 0,
      totalSubscribers: totalCount || 0,
      success: true,
    })
  } catch (error) {
    console.error('[v0] Newsletter stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
