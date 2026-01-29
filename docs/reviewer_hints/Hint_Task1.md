# Reviewer Hints: Layout Stability

## Problem
The current app shows a large loading spinner (`ActivityIndicator`) while fetching the initial data. This causes a layout shift when the content finally appears (the "pop-in" effect).

## What to look for
1.  **Skeleton Component**: The candidate should create a new component (e.g., `FeedItemSkeleton`) or use a library.
    *   Ideally, they create a custom view that mimics the structure of `FeedItem.js` (header, large image block, text lines).
    *   Animated opacity or background color is a plus (indicating "loading").
2.  **Implementation**:
    *   In `Feed.js`, replace the `if (loading)` block that returns the spinner with a view that renders multiple Skeleton items.
    *   Checking if they render enough skeletons to fill the screen (e.g., 3-5 items).

## Better solution Code Snippet
```javascript
// FeedItemSkeleton.js
export const FeedItemSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.header}>
       <View style={[styles.avatar, {backgroundColor: '#e1e9ee'}]} />
       <View style={{height: 16, width: '40%', backgroundColor: '#e1e9ee', borderRadius: 4}} />
    </View>
    <View style={{height: 250, width: '100%', backgroundColor: '#e1e9ee'}} />
    <View style={{padding: 12}}>
        <View style={{height: 14, width: '90%', backgroundColor: '#e1e9ee', marginBottom: 6, borderRadius: 4}} />
        <View style={{height: 14, width: '70%', backgroundColor: '#e1e9ee', borderRadius: 4}} />
    </View>
  </View>
);
```
