## 2025-05-22 - [Dynamic Imports in Server Components]
**Learning:** In Next.js 16 with Turbopack, using `next/dynamic` with `ssr: false` inside a Server Component causes build errors. For non-critical client-side components like widgets, use dynamic imports without `ssr: false` or move them to a Client Component wrapper if SSR must be disabled.
**Action:** Always check if the file is a Server Component before adding `ssr: false` to `next/dynamic`.

## 2025-05-22 - [Pnpm 10 and Sharp]
**Learning:** Pnpm 10 ignores build scripts for native dependencies like `sharp` by default. This prevents Next.js from using `sharp` for image optimization during the build.
**Action:** Run `pnpm config set only-built-dependencies sharp` to allow the dependency to build.
