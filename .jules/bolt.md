## 2025-05-15 - [Dynamic Import for Non-Critical Widgets]
**Learning:** In Next.js 16, using `next/dynamic` with `ssr: false` for named exports within Server Components requires a specific pattern: `dynamic(() => import('./module').then(mod => mod.Component), { ssr: false })`. This helps reduce initial JavaScript bundle size and improves hydration time by deferring the loading of non-critical interactive elements like chat widgets and scroll-to-top buttons.
**Action:** Always prefer lazy-loading for non-critical, client-side-only components that are only visible after interaction or scrolling.

## 2025-05-15 - [Passive Scroll Listeners with rAF]
**Learning:** Adding `{ passive: true }` to scroll event listeners informs the browser that the listener will not call `preventDefault()`, allowing for smoother scrolling performance. Combining this with `requestAnimationFrame` (rAF) prevents excessive main-thread work by ensuring that state updates related to scrolling occur only once per frame.
**Action:** Use passive scroll listeners and `requestAnimationFrame` for all UI state updates driven by window scroll events.
