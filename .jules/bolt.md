## 2026-05-27 - [Optimization of High-Frequency Events]
**Learning:** High-frequency events like `scroll`, `mousemove`, and `touchmove` can significantly impact main-thread performance and lead to layout thrashing if state updates or layout-triggering methods (like `getBoundingClientRect`) are called inside them.
**Action:** Use a throttle utility for `scroll` events (100ms is a good balance). For interactive components like sliders, use `requestAnimationFrame` to decouple event handling from visual updates, and cache layout dimensions at the start of the interaction to avoid layout thrashing.

## 2026-05-27 - [Build Process Side Effects]
**Learning:** Next.js 16's build process automatically modifies `tsconfig.json` to include its own type definitions, which can lead to unintended configuration changes being committed.
**Action:** Always verify and restore `tsconfig.json` after running `pnpm build` if the project has strict constraints against configuration changes.
