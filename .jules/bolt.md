# Bolt's Performance Journal

## 2025-05-15 - Enable Image Optimization
**Learning:** Found a 1.1MB PNG logo (`highly-20polished-203d-20v.png`) being used as a 60x60 icon. The `next.config.mjs` had `unoptimized: true` set, forcing the browser to download the full-resolution asset. Enabling Next.js image optimization allows for automatic resizing and modern format conversion (WebP/AVIF), which will reduce this asset's size by >95% and improve overall page weight and LCP.
**Action:** Always verify if `unoptimized: true` is enabled in `next.config.mjs` when encountering large assets used in small containers.
