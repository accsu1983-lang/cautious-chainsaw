# Bolt's Performance Journal

This is a space to record critical learnings about performance optimizations in this codebase.

## 2025-08-11 - Optimize Supabase Middleware Session Check
**Learning:** Instantiating the Supabase client and executing `supabase.auth.getUser()` on every request significantly degrades TTFB (Time to First Byte) by 50-100ms on public landing pages. By detecting if the route is public and there are no active Supabase cookies (prefix `sb-`), we can skip client creation and session checks completely.
**Action:** Before invoking authentication checks in Middleware, check route protection patterns and verify cookie existence to avoid unnecessary network hops for anonymous web traffic.
