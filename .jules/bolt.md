## 2025-05-22 - Optimized High-Frequency Event Handlers

**Learning:** Unthrottled scroll and mouse/touch move events can cause significant main-thread overhead and layout thrashing, especially when components call `getBoundingClientRect` frequently or trigger state updates on every event tick.

**Action:** Use a `throttle` utility (e.g., 100ms) for scroll-based visibility logic to reduce execution frequency by ~90%. For high-frequency interactions like sliders, use `requestAnimationFrame` and cache static dimensions (like `containerRect`) at the start of the interaction to avoid layout thrashing. Always ensure `import React from 'react'` is present when using hooks in this Next.js 16 environment.
