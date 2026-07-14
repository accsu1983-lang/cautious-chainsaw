## 2025-05-15 - [Throttling Scroll Events]
**Learning:** High-frequency scroll event listeners in `CTABar`, `BackToTop`, and `WhatsAppWidget` cause unnecessary re-renders. Next.js 16 build process automatically modifies `tsconfig.json` which must be reverted.
**Action:** Use a custom `throttle` utility for high-frequency events. Always revert `tsconfig.json` changes after build to maintain repository constraints.
