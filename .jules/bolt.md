# Bolt's Performance Journal

## 2025-05-14 - Throttling Scroll Listeners
**Learning:** High-frequency scroll event listeners in `BackToTop`, `CTABar`, and `WhatsAppWidget` were executing visibility checks and state updates on every scroll event, leading to unnecessary main-thread overhead. Throttling these to 100ms reduces execution frequency by ~90% without impacting perceived UI responsiveness. Using `{ passive: true }` further optimizes by telling the browser the listener won't call `preventDefault()`.

**Action:** Always use `throttle` (100-200ms) and `{ passive: true }` for scroll-dependent UI logic that doesn't require precise pixel-perfect updates on every frame. Use `useMemo` in React components to ensure the throttled function instance remains stable across re-renders.
