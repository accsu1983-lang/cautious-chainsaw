## 2025-05-15 - Throttling High-Frequency UI Events
**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) can consume significant main-thread resources, especially when they trigger layout-recalculation (e.g., calling `getBoundingClientRect`). Throttling scroll events to 100ms (10Hz) provides a good balance between responsiveness and efficiency. Using `requestAnimationFrame` for interactive sliders ensures updates are synchronized with the display refresh rate and prevents layout thrashing when container dimensions are cached at the start of interaction.
**Action:** Always prefer throttled listeners for scroll-based visibility logic. For drag interactions, cache static dimensions (like `getBoundingClientRect`) in a `ref` during `mousedown`/`touchstart` instead of recalculating them on every `mousemove`/`touchmove`.

## 2025-05-15 - React Hooks and Global React in Next.js 16
**Learning:** Even with individual imports (e.g., `import { useRef } from 'react'`), some Next.js 16 environments may throw 'ReferenceError: React is not defined' during SSR/Build if `import React from 'react'` is missing.
**Action:** Explicitly include `import React from 'react'` in files using hooks or JSX to ensure compatibility across different build environments.
