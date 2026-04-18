## 2025-05-14 - Event Throttling and RAF Optimization
**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) can significantly impact main-thread performance and visual smoothness. Unthrottled scroll listeners cause excessive re-renders, while interactive components like sliders can lag if state updates aren't synchronized with the paint cycle.
**Action:** Use a `throttle` utility (100ms with `{ passive: true }`) for scroll-based UI visibility logic. For high-frequency interactive input (like drag-to-compare sliders), use `requestAnimationFrame` to ensure updates occur exactly once per frame, capturing the latest input coordinate within the frame to maintain responsiveness.

## 2025-05-14 - Next.js 16 Configuration Stability
**Learning:** The Next.js 16 build process automatically modifies `tsconfig.json` to include `.next/dev/types/**/*.ts` if it detects TypeScript.
**Action:** When working under strict "no-modification" constraints for configuration files, always run `git restore tsconfig.json` after a build or dev server run to revert these automated changes before submission.
