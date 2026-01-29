# Step 3: Asset Optimization (Progressive Loading)

## Goal
Eliminate "Empty State" anxiety.

## Action
Use Blur-Hash or low-res "preview" images that load instantly, followed by high-res assets.

## Benefit
Provides immediate visual feedback, even on 3G/Edge connections.

## Implementation Tasks
1. Open `src/components/FeedItem.js`.
2. Import `Image` from `expo-image` (it is already installed).
3. Replace the standard React Native `Image` component.
4. Pass the `item.blurhash` to the `placeholder` prop of the new Image component.
5. Add a `transition` prop (e.g., 1000ms) to make the image fade in smoothly.

