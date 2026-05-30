## 2026-05-30 - Next.js Build Side Effects on tsconfig.json
**Learning:** Running `pnpm build` in this Next.js 16 environment automatically appends `'.next/dev/types/**/*.ts'` and `'.next/types/**/*.ts'` to the `include` array in `tsconfig.json`.
**Action:** Always run `git restore tsconfig.json` after a build to maintain the repository's configuration integrity and adhere to "Bolt" constraints against unintended config changes.

## 2026-05-30 - Event Listener Optimization for Landing Pages
**Learning:** High-frequency events like `scroll`, `mousemove`, and `touchmove` in interactive components (CTABar, Gallery Slider) can consume significant main-thread time. Throttling scroll events to 100ms reduces execution frequency by ~90% while remaining responsive enough for UI state changes (visibility toggles). For interactive sliders, decoupling state updates from input events using `requestAnimationFrame` prevents layout thrashing.
**Action:** Use the custom `throttle` utility for visibility logic and `requestAnimationFrame` for continuous visual feedback components.
