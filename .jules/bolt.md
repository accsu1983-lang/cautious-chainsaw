# Bolt's Performance Journal

## 2025-05-15 - React.memo on Static Standalone Components
**Learning:** Components such as `About` or `GoogleReviews` render static HTML content and cards. Adding `React.memo` prevents unnecessary re-renders when parent state updates.
**Action:** Wrap un-memoized static components with `React.memo` to optimize render trees.
