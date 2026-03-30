## 2025-05-22 - [Middleware TTFB Optimization]
**Learning:** Supabase middleware `supabase.auth.getUser()` adds significant TTFB overhead for every request, even for anonymous users on public pages.
**Action:** Skip `getUser()` if no auth cookies are present and the path is not protected.
