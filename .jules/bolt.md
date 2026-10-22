## 2025-07-02 - Layout Thrashing in BeforeAfterGallery
**Learning:** High-frequency events (mousemove/touchmove) combined with `getBoundingClientRect()` inside the event handler cause layout thrashing, which leads to dropped frames and high CPU usage.
**Action:** Always cache dimensions at the start of the interaction (mousedown/touchstart) and use `requestAnimationFrame` to decouple visual updates from event frequency.

## 2025-07-02 - Throttling Scroll Listeners
**Learning:** Next.js pages with multiple scroll-dependent floating widgets (WhatsApp, Back to Top, CTA Bar) can suffer from scroll performance degradation due to multiple simultaneous state updates on every scroll pixel.
**Action:** Use a throttled (100ms) scroll listener and `{ passive: true }` to keep the main thread responsive during scrolling.
