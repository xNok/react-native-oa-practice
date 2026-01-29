# Reviewer Hints: Virtualized List Performance

## Problem
Currently using `FlatList`. While okay for small lists, `FlashList` offers superior performance on low-end devices by recycling views more aggressively.

## What to look for
1.  **Dependency**: Importing `FlashList` from `@shopify/flash-list`.
2.  **Replacement**: Swapping `<FlatList />` for `<FlashList />`.
3.  **Critical Prop**: `estimatedItemSize` MUST be present. This is the main requirement for FlashList to work correctly.
    *   For `FeedItem`, the height is roughly `header(56) + image(250) + padding(~20) + text(~50) + margin(20)` ≈ 400px.
4.  **KeyExtractor**: FlashList handles this well automatically, but keeping it is fine.

## Better solution Code Snippet
```javascript
import { FlashList } from "@shopify/flash-list";

// ... inside Feed component
<FlashList
  data={data}
  renderItem={({ item }) => <FeedItem item={item} />}
  estimatedItemSize={400} // Crucial!
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
/>
```
