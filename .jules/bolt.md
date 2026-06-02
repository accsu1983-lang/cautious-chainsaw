## 2025-06-02 - Throttled Scroll Listeners
**Learning:** High-frequency events like scrolling in components like `CTABar`, `BackToTop`, and `WhatsAppWidget` can trigger excessive state updates and visibility checks, impacting main-thread availability. Throttling these to 100ms (10Hz) reduces execution frequency by ~90% while remaining responsive for UI transitions.

**Action:** Always throttle scroll and resize listeners to ~100ms and use `{ passive: true }` to ensure smooth scrolling.

## 2025-06-02 - tsconfig.json Auto-modification
**Learning:** Running `next build` (or `pnpm build`) in this environment automatically modifies `tsconfig.json` to include `.next/types/**/*.ts` or similar, which might violate repository constraints if committed.

**Action:** Always verify `git status` after a build and restore `tsconfig.json` if it was modified by the build tool before submitting a PR.
