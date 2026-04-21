## 2025-05-14 - [High-frequency Event Optimization]
**Learning:** Throttling scroll-dependent visibility logic (e.g., 'Back to Top' buttons) to 100ms (10Hz) reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions.
**Action:** Use the shared `throttle` utility in `lib/throttle.ts` for all scroll-based UI updates that don't require 60fps precision.

## 2025-05-14 - [Interactive Animation Framing]
**Learning:** When implementing `requestAnimationFrame` for interactive components (like sliders), capture performance-critical properties (e.g., `clientX`) into a shared variable (e.g., `latestX`) *outside* the frame gating logic. This ensures the asynchronous callback uses the most up-to-date user input rather than potentially stale data from the initial trigger event.
**Action:** Use a `latestRef` pattern when bridging high-frequency events to `requestAnimationFrame` to ensure input accuracy.

## 2025-05-14 - [Touch Event Passive Flags]
**Learning:** `touchmove` listeners must not be marked as `{ passive: true }` if you need to call `preventDefault()` to prevent native browser scrolling during a custom interaction (like dragging a slider handle).
**Action:** Explicitly set `{ passive: false }` for critical touch interaction listeners to ensure reliable coordinate capture and prevent jittery scroll interference.
