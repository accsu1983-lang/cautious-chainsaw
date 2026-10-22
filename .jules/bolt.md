## 2026-06-29 - [Throttling Scroll Listeners]
**Learning:** Scroll event listeners in Next.js/React components (like BackToTop or WhatsApp widgets) that trigger state updates on every scroll tick can cause excessive re-renders and main-thread jank. Throttling these listeners to ~100ms (10Hz) significantly reduces overhead while maintaining perceived responsiveness.
**Action:** Always throttle high-frequency events (scroll, resize, mousemove) to a reasonable frequency and use `{ passive: true }` for scroll listeners to improve browser scrolling performance.
