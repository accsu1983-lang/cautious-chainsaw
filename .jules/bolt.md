# Bolt's Performance Journal

## 2025-05-14 - Next.js 16.0.10 Performance Patterns
**Learning:** In Next.js 16, using `next/dynamic` with `ssr: false` within a Server Component (e.g., `app/page.tsx`) causes build errors. Named exports in dynamic imports should follow the `.then(mod => mod.ComponentName)` pattern.
**Action:** Always use dynamic imports without `ssr: false` when importing into Server Components, or move the dynamic import into a Client Component wrapper if `ssr: false` is strictly required.

## 2025-05-14 - Build Side Effects on Configuration
**Learning:** The `pnpm build` command in Next.js 16 automatically adds `'.next/dev/types/**/*.ts'` to the `include` section of `tsconfig.json`.
**Action:** Manually revert this change before submission if no-modification constraints on configuration files are in place.
