## 2025-05-15 - [Slider Optimization with requestAnimationFrame]
**Learning:** Throttling `mousemove` and `touchmove` events to a fixed interval (e.g., 16ms) can still lead to visual jank if the updates aren't synchronized with the browser's refresh cycle. Using `requestAnimationFrame` ensures that state updates which trigger layout changes (like a slider position) happen exactly once per frame, preventing redundant calculations and visual stutter.
**Action:** Prefer `requestAnimationFrame` over fixed-interval throttling for any event-driven UI updates that involve DOM layout or CSS transitions.

## 2025-05-15 - [Throttling High-Frequency Scroll Events]
**Learning:** Multiple components (CTABar, BackToTop, WhatsAppWidget) listening to `scroll` events independently can significantly increase main-thread execution time during fast scrolling. A shared throttle utility with both leading and trailing edges ensures immediate feedback (leading) while guaranteeing the final state (trailing) is correctly captured (e.g., when a user stops scrolling at a specific threshold).
**Action:** Audit for unthrottled `scroll` and `resize` listeners in landing page components and apply a consistent 100ms throttle.
