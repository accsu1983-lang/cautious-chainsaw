## 2025-05-14 - [Throttled Scroll Listeners]
**Learning:** High-frequency scroll event listeners (standard 60-120Hz) for simple visibility toggles consume unnecessary main-thread cycles. Throttling to 100ms (10Hz) reduces execution frequency by ~90% without perceptible impact on UI responsiveness for these specific use cases.
**Action:** Always throttle scroll-dependent visibility logic to 100ms and use `{ passive: true }` to avoid blocking the compositor thread.
