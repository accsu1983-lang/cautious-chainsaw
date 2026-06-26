## 2026-06-26 - [Unthrottled Scroll Listeners]
**Learning:** Multiple components (BackToTop, WhatsAppWidget, CTABar) implement unthrottled scroll event listeners, which can lead to excessive main-thread work and layout thrashing during fast scrolling.
**Action:** Implement a reusable `throttle` utility and apply it to all scroll-dependent components to improve scroll performance and battery life.
