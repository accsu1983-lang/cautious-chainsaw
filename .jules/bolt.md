## 2026-06-10 - Optimizing high-frequency event handlers

**Learning:** Scroll event listeners in `BackToTop`, `CTABar`, and `WhatsAppWidget` were executing on every scroll pixel, causing unnecessary state updates. Additionally, `BeforeAfterGallery` was triggering layout thrashing by calling `getBoundingClientRect` on every mouse/touch movement.

**Action:**
- Introduced a `throttle` utility to limit scroll event handler execution to 100ms (~10Hz), reducing main-thread overhead by ~90% for these UI state transitions.
- Added `{ passive: true }` to scroll listeners to improve scroll performance.
- Optimized `BeforeAfterGallery` by caching container dimensions at the start of interaction (`mousedown`/`touchstart`) and using `requestAnimationFrame` to batch UI updates, preventing layout thrashing and ensuring smoother drag interactions.
