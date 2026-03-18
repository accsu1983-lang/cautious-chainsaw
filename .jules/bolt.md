## 2025-05-15 - [Optimize middleware to skip redundant auth checks for anonymous users]
**Learning:** In Next.js applications using Supabase SSR, the middleware often calls `supabase.auth.getUser()` on every request to refresh the session. For a landing page with many anonymous visitors, this results in a redundant network request to the Supabase Auth API, increasing TTFB.
**Action:** Implement conditional logic in the middleware to skip `getUser()` if the request is for a public route and no Supabase auth cookies are present.
