# Step 1: Layout Stability (Skeletons)

## Goal
Prevent layout shifts.

## Action
Use Skeleton Placeholders that mirror the final content structure.

## Benefit
Improves "Perceived Performance" by showing the UI shell before the data arrives.

## Implementation Tasks
1. Create a `FeedItemSkeleton` component in `src/components/FeedItemSkeleton.js`.
   - It should use standard `View`s with background colors to simulate the layout of `FeedItem.js`.
   - No need for complex external libraries, just simple gray boxes.
2. Modify `src/components/Feed.js`.
   - Instead of showing `<ActivityIndicator />` when `loading` is true, render a list of 5-6 `FeedItemSkeleton` components.

