## 2026-04-15 - [Event Listener Optimization]
**Learning:** High-frequency events like `scroll`, `mousemove`, and `touchmove` can cause significant jank if not throttled or synchronized with the browser's refresh rate. Throttling scroll events to 100ms reduces handler execution frequency by ~90% while maintaining responsiveness for UI triggers. Using `requestAnimationFrame` for interactive elements like sliders ensures smooth 60fps updates and avoids unnecessary intermediate renders.
**Action:** Use the `throttle` utility for scroll-based visibility toggles and `requestAnimationFrame` for continuous interaction updates. Always add `{ passive: true }` to scroll listeners unless `preventDefault()` is required.

## 2026-04-15 - [Next.js 16 Config Persistence]
**Learning:** `pnpm build` in Next.js 16 (Turbopack) automatically modifies `tsconfig.json` to include `.next` types. These changes are often staged automatically and must be explicitly reverted to comply with 'no-modification' constraints on configuration files.
**Action:** Run `git restore --staged tsconfig.json && git restore tsconfig.json` after builds to ensure the repository remains clean.
