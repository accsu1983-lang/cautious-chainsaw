# Bolt's Performance Journal

## 2026-02-18 - Throttled Floating UI Event Listeners
**Learning:** Multi-listener high-frequency event binds (e.g., window scroll) on global UI components like BackToTop, CTABar, and WhatsAppWidget lead to redundant main-thread overhead and layout calculation thrashing during scrolling. In Next.js 16 + React 19, explicit `import React` is crucial when using hooks inside Client Components to prevent potential 'React is not defined' SSR reference errors.
**Action:** Implement a custom `throttle` utility in `lib/` with leading/trailing controls and a `.cancel()` method. When attaching scroll listeners, use the `{ passive: true }` option to bypass scroll-blocking rendering cycles, wrap the throttled handler with `useMemo`, and invoke `.cancel()` on component unmount in `useEffect`'s cleanup function to prevent memory leaks.
