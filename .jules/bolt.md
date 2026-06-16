## 2026-06-16 - [Scroll Throttling & rAF Interaction]
**Learning:** Throttling scroll events to 100ms (10Hz) significantly reduces main-thread work for visibility logic without impacting perceived responsiveness. For interactive components like image sliders, `requestAnimationFrame` is superior as it syncs with the display's refresh rate and avoids layout thrashing if dimensions are cached.
**Action:** Always prefer `requestAnimationFrame` for high-frequency coordinate-based interactions. Use `{ passive: true }` for scroll listeners when `preventDefault` is not needed to enable browser-level optimizations.

## 2026-06-16 - [Build Side Effects]
**Learning:** In this Next.js 16 environment, `pnpm build` automatically modifies `tsconfig.json` by adding entries to the `include` array. This violates repository constraints if not reverted.
**Action:** Always run `git restore tsconfig.json` after running a build to maintain configuration integrity.
