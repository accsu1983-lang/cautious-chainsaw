## 2026-07-18 - [Throttled Scroll Events]
**Learning:** High-frequency layout-independent UI updates (like toggling class visibility based on `window.scrollY` in multiple components) run on every pixel scrolled, putting unnecessary stress on the browser's main thread and leading to potential frame drops during scroll.
**Action:** Implement a custom `throttle` utility in `lib/throttle.ts` and apply it with a 100ms wait time and `{ passive: true }` listener configurations on floating elements (`BackToTop`, `CTABar`, `WhatsAppWidget`).
