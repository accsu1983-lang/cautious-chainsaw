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

    // ⚡ BOLT OPTIMIZATION: Execute database count queries concurrently using Promise.all
    // Eliminates sequential round-trip latency to Supabase, reducing handler execution time by ~50%.
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

    return NextResponse.json({
      activeSubscribers: activeResult.count || 0,
      totalSubscribers: totalResult.count || 0,
      success: true,
    })
  } catch (error) {
    console.error('[v0] Newsletter stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
