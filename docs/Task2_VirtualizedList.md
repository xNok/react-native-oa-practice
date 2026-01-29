# Step 2: Virtualized List Performance

## Goal
Maintain 60 FPS during heavy scrolling.

## Action
Implement Component Recycling (e.g., FlashList).

## Benefit
Minimizes memory footprint by reusing native views instead of creating thousands of JS objects.

## Implementation Tasks
1. Open `src/components/Feed.js`.
2. Import `FlashList` from `@shopify/flash-list`.
3. Replace the `FlatList` component with `FlashList`.
4. Run the app and observe usually the error or warning about missing `estimatedItemSize`.
5. Calculate or estimate the height of `FeedItem` and set the `estimatedItemSize` prop correctly.

