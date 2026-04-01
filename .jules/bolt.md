## 2025-05-14 - [Throttling Scroll Thresholds]
**Learning:** Throttling scroll listeners for UI visibility toggles (e.g., `window.scrollY > 500`) requires a trailing edge. A leading-edge-only throttle can skip the final scroll event if it occurs within the throttle window, leaving the UI in an stale state.
**Action:** Use a throttle implementation that includes a trailing edge for any state updates that depend on reaching a specific value or threshold.
