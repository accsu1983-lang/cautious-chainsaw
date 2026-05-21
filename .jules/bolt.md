## 2025-05-14 - Automated tsconfig.json modifications by Next.js 16
**Learning:** Next.js 16's build process automatically adds '.next/dev/types/**/*.ts' and '.next/types/**/*.ts' to the include array in tsconfig.json. These additions can be automatically staged by the dev server or build process.
**Action:** Manually revert changes to tsconfig.json using `git restore` or `git restore --staged` after every build or dev session to adhere to repository constraints against unintended configuration changes.

## 2025-05-14 - Scroll performance optimization with 100ms throttle
**Learning:** For scroll-dependent UI visibility logic (like 'Back to Top' buttons), a 100ms (10Hz) throttle is sufficient for user perception and reduces event handler execution frequency by approximately 90% compared to unthrottled execution.
**Action:** Use the custom throttle utility with a 100ms delay and { passive: true } for all scroll-based visibility toggles to minimize main-thread overhead.
