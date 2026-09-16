import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * ⚡ BOLT OPTIMIZATION: Early Return & Fast Path for Unauthenticated / Public Requests
 *
 * In Next.js middleware / proxy, running `supabase.auth.getUser()` on every request (including public pages
 * like /, /sitemap.xml, public static routes, etc.) introduces unnecessary network latency and client creation overhead
 * when no user session cookies exist and the path does not require authentication.
 *
 * Performance gain:
 * - Public requests without Supabase auth cookies (`sb-*`) bypass Supabase client initialization & auth check entirely (~10-50ms latency saved per public request).
 * - Retains full session validation for protected routes (/protected, /admin) and requests containing Supabase session cookies.
 */
export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route requires authentication
  const isProtectedRoute = pathname.startsWith('/protected') || pathname.startsWith('/admin')
  const isProtectedApiRoute = pathname.startsWith('/api/admin')

  // Check if request carries any Supabase session cookies
  const hasSupabaseCookie = request.cookies.getAll().some((cookie) => cookie.name.startsWith('sb-'))

  // Fast path: If route is public and no Supabase session cookies exist, return immediately without instantiating client or making network calls.
  if (!isProtectedRoute && !isProtectedApiRoute && !hasSupabaseCookie) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getUser() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if ((isProtectedRoute || isProtectedApiRoute) && !user) {
    if (isProtectedApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}
