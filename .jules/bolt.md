## 2025-05-01 - [Throttling High-Frequency Events]
**Learning:** Throttling scroll-dependent visibility logic (e.g., 'Back to Top' buttons) to 100ms (10Hz) reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions. Using `requestAnimationFrame` for interactive sliders ensures UI updates are synchronized with the browser's paint cycles.
**Action:** Use the shared `throttle` utility for scroll/resize events and `requestAnimationFrame` for mouse/touch move interactions. Always include `{ passive: true }` for these listeners to improve scroll performance.

## 2025-05-01 - [Next.js 16 tsconfig.json Auto-Updates]
**Learning:** Next.js 16's build process automatically adds `'.next/dev/types/**/*.ts'` and `'.next/types/**/*.ts'` to the `include` array in `tsconfig.json`.
**Action:** Manually revert these changes after a build to maintain strict configuration control and adhere to repository constraints.
