## 2026-05-18 - [Optimized Event Listeners]
**Learning:** Throttling scroll events to 100ms (10Hz) significantly reduces main-thread overhead for secondary UI components (CTABar, BackToTop, WhatsApp) without affecting perceived responsiveness. Additionally, using `requestAnimationFrame` for interactive sliders ensures smooth updates by aligning with the browser's paint cycle and avoiding layout thrashing.
**Action:** Always throttle high-frequency scroll listeners to ~100ms and use `requestAnimationFrame` for coordinate-based UI interactions (drag/swipe).
