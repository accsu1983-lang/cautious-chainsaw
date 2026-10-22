# Bolt's Performance Journal

## 2026-07-03 - Initial Performance Audit
**Learning:** Found multiple unthrottled scroll event listeners in `BackToTop`, `CTABar`, and `WhatsAppWidget`. While the logic inside is simple, high-frequency scroll events can still cause unnecessary overhead and state update checks. Captured `getBoundingClientRect` in `BeforeAfterGallery` is already correctly placed outside the move handlers to avoid layout thrashing.
**Action:** Implement a lightweight `throttle` utility and apply it to scroll-heavy components.
