## 2025-03-13 - [Image Optimization]
**Learning:** Enabling Next.js image optimization (removing `unoptimized: true`) can significantly reduce payload size for large assets like logos (1.1MB reduced to few KBs). Adding `priority` to above-the-fold images improves LCP.
**Action:** Always check `next.config.mjs` for `unoptimized: true` and verify if it's necessary. Ensure LCP images have `priority`.
