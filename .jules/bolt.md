# Bolt's Journal - Critical Learnings Only

## 2026-02-02 - Code Splitting with dynamic imports
**Learning:** For a single-page landing page with many interactive Client Components (Video, Gallery, Calculator, etc.), the initial JavaScript bundle can become a bottleneck for FCP and TBT. Using `next/dynamic` for components that are not visible above the fold significantly reduces the initial payload. In Next.js 16, ensuring that dynamic imports of named exports use the `.then(mod => mod.ComponentName)` pattern is crucial for compatibility.
**Action:** Always identify components that are below the fold or conditionally rendered and use `next/dynamic` to defer their loading.

## 2026-02-02 - Next.js 16 Server Components and `ssr: false`
**Learning:** In Next.js 16, using `ssr: false` with `next/dynamic` is not permitted within Server Components (like `app/page.tsx`). Attempting to do so results in a build error: "`ssr: false` is not allowed with `next/dynamic` in Server Components. Please move it into a Client Component."
**Action:** When using `ssr: false` for client-only widgets, either place them inside a wrapper Client Component or accept that they will be pre-rendered on the server if imported directly in a Server Component.
