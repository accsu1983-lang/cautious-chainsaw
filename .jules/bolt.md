## 2025-05-09 - [Throttling High-Frequency Event Listeners]
**Learning:** Scroll events can fire at up to 120Hz on modern displays, leading to redundant execution of visibility logic. Interaction events like `mousemove` and `touchmove` also benefit from synchronization with the browser's refresh rate. Throttling scroll events to 100ms (10Hz) reduces execution frequency by ~90% while remaining visually responsive.
**Action:** Always use a throttled wrapper for scroll events and `requestAnimationFrame` for interaction-heavy UI updates. Ensure `{ passive: true }` is used for scroll and touch listeners when `preventDefault()` is not required to improve scrolling performance.

## 2025-05-09 - [Next.js 16 Build Effects on tsconfig.json]
**Learning:** In Next.js 16, running `pnpm build` or `pnpm dev` automatically modifies `tsconfig.json` to include `.next/dev/types/**/*.ts` and `.next/types/**/*.ts`.
**Action:** Manually revert changes to `tsconfig.json` using `git restore` after every build or dev session to comply with repository constraints against configuration changes.
