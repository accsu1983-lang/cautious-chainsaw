## 2026-06-22 - Optimized High-Frequency Scroll Listeners
**Learning:** Throttling scroll-dependent visibility logic to 100ms (10Hz) reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions. Using `{ passive: true }` on these listeners further optimizes scroll performance by allowing the browser to avoid waiting for `preventDefault()` checks.
**Action:** Always prefer throttled, passive event listeners for scroll-based UI state changes. Ensure throttled functions are stable (via `useMemo`) and cleaned up on unmount.
