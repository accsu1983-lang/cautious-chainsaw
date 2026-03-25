# Bolt Performance Journal ⚡

This journal documents critical performance patterns, bottlenecks, and learnings for this codebase.

## 2025-05-15 - [Initial Entry]
**Learning:** The Supabase middleware in `@supabase/ssr` defaults to calling `getUser()` on every request, which is an external API call and impacts TTFB significantly for anonymous visitors.
**Action:** Implement conditional auth checks to skip `getUser()` when no auth cookies are present on public routes.
