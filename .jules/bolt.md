# Bolt's Performance Journal

## 2025-02-18 - Throttled High-Frequency Scroll Event Listeners
**Learning:** Raw window scroll listeners in components (like BackToTop, CTABar, and WhatsAppWidget) trigger layout calculations up to 120+ times per second on modern displays. This puts high load on the browser's main-thread. Throttling these scroll handlers with a 100ms interval and utilizing passive event listeners (`{ passive: true }`) ensures smooth scrolling frame-rates (60-120 FPS) and eliminates main-thread lockups.
**Action:** Always wrap high-frequency scroll and resize listeners in React components with a persistent throttled function (using `useMemo` with an empty dependency array to maintain reference stability) and ensure proper unmount cleanup via a `.cancel()` method to prevent memory leaks.
