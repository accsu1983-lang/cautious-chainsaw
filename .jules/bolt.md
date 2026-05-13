# Bolt's Performance Journal

This journal tracks critical codebase-specific performance learnings for On The Spot Curtain Cleaning landing page.

## 2025-05-14 - Unthrottled Scroll Listeners
**Learning:** Multiple components (`BackToTop`, `WhatsAppWidget`, `CTABar`) were using unthrottled scroll event listeners, which can lead to high main-thread activity during scrolling.
**Action:** Implement a reusable `throttle` utility and apply it to all scroll-dependent visibility logic with a 100ms limit and `{ passive: true }`.
