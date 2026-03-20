## 2024-03-20 - [Next.js 16 Dynamic Imports in Server Components]
**Learning:** In Next.js 16, using `next/dynamic` with `ssr: false` within a Server Component (e.g., `app/page.tsx`) causes build errors. Named exports in dynamic imports should follow the `.then(mod => mod.ComponentName)` pattern.
**Action:** Avoid `ssr: false` when using `next/dynamic` in Server Components. Use the `.then()` pattern for named exports.

## 2024-03-20 - [Pnpm 10 and Sharp Build Scripts]
**Learning:** Pnpm 10 ignores build scripts for native dependencies like `sharp` by default. This can prevent Next.js from performing image optimization during the build.
**Action:** Use `pnpm config set only-built-dependencies sharp` and `pnpm install` to allow `sharp` to run its build scripts.
