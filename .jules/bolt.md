## 2025-03-26 - [Optimized Logo and Throttled Scroll Listeners]

**Learning:**
- Discovered a 1.1MB PNG logo being used as a small (60x60) header/footer icon. This is a massive performance bottleneck for initial page load and LCP.
- Multiple components (`CTABar`, `BackToTop`, `WhatsAppWidget`) used unthrottled scroll event listeners, which can lead to layout thrashing and high main-thread usage during scrolling.

**Action:**
- Optimized the logo by resizing it to 120px (2x for high-DPI) and converting it to WebP, reducing size from 1072.9KB to 3.2KB (99.7% reduction).
- Implemented `requestAnimationFrame` throttling for all scroll event listeners to ensure state updates happen at most once per frame, improving scroll smoothness.
- In future optimizations, always check the `public/images` directory for oversized assets that may have been overlooked.
