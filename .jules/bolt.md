# Bolt's Performance Journal

## 2025-05-14 - Initial Assessment
**Learning:** The project uses Next.js 16 with Turbopack and has `unoptimized: true` for images. Scroll-dependent components are already throttled.
**Action:** Look for missing memoization or expensive re-renders in complex components like the gallery or forms.
