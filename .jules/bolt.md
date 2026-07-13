## 2026-07-13 - Throttling Scroll Listeners
**Learning:** High-frequency scroll event listeners in `BackToTop`, `CTABar`, and `WhatsAppWidget` cause unnecessary main-thread load. Implementing a 100ms throttle and using `{ passive: true }` significantly reduces CPU usage during scroll without impacting perceived responsiveness.
**Action:** Always throttle high-frequency events (scroll, resize, mousemove) and use passive listeners where `preventDefault()` is not required.
