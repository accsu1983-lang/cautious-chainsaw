## 2026-08-01 - Scroll Event Throttling
**Learning:** High-frequency scroll event listeners on floating UI elements (such as `BackToTop`, `CTABar`, and `WhatsAppWidget`) execute on every pixel scroll, saturating the browser main-thread, layout calculations, and paint pipelines. Introducing a lightweight `throttle` utility keeps execution to once per 100ms, drastically optimizing scroll performance while preserving ideal responsiveness.
**Action:** Use a robust, fully-typed `throttle` helper with React's `useMemo` for preservation across renders, and explicitly call `.cancel()` on unmount.
