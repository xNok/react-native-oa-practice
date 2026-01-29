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

## Alternative: Optimized FlatList
If the candidate chooses to optimize `FlatList` manually (or if you ask them "How would you do this without a library?"):

1.  **getItemLayout (Crucial)**: Without this, `FlatList` calculates layout on the fly.
    ```javascript
    getItemLayout={(data, index) => (
      // 400 is the approximate height of the component
      {length: 400, offset: 400 * index, index}
    )}
    ```
2.  **removeClippedSubviews**: Should be `true`.
3.  **props**:
    *   `windowSize`: Should be reduced (e.g., 5-10) to save memory.
    *   `initialNumToRender`: Should match what's visible on screen (e.g., 5).

## Alternative: Custom Virtualization (Expert)
If the candidate builds it from scratch using `ScrollView`:

1.  **Math**:
    *   `startIndex = Math.floor(scrollTop / itemHeight)`
    *   `endIndex = Math.min(itemCount - 1, Math.floor((scrollTop + containerHeight) / itemHeight))`
2.  **Spacers**: The crucial part.
    *   `paddingTop = startIndex * itemHeight`
    *   `paddingBottom = (itemCount - endIndex - 1) * itemHeight`
3.  **Code Structure**:
    ```javascript
    const itemHeight = 400;
    const [scrollTop, setScrollTop] = useState(0);
    
    // Calculate visible range
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + Math.ceil(screenHeight / itemHeight) + 2; // +buffer
    
    // Slice data
    const visibleData = data.slice(startIndex, endIndex);
    
    return (
      <ScrollView onScroll={(e) => setScrollTop(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16}>
        <View style={{ height: startIndex * itemHeight }} /> 
        {visibleData.map(item => <FeedItem key={item.id} item={item} />)}
        <View style={{ height: (data.length - endIndex) * itemHeight }} />
      </ScrollView>
    );
    ```

