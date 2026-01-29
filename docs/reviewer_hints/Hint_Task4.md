# Reviewer Hints: Deterministic Data Fetching

## Problem
The `loadData` function currently only fetches page 0. We need infinite scrolling that appends data.

## What to look for
1.  **State**:
    *   `data`: Should *append* new items, not replace them. `setData(prev => [...prev, ...newData])`.
    *   `cursor` or `nextCursor`: Need to store the `nextCursor` returned from the API.
    *   `isLoadingMore`: Separate loading state for the bottom spinner vs initial load.
2.  **API Call**: Passing the current `cursor` to `fetchFeed`.
3.  **Trigger**: Using `onEndReached` in the List component to trigger the next fetch.
4.  **Guard Clauses**: Preventing multiple fetches if one is already in progress (`if (loading) return`).

## Better solution Code Snippet
```javascript
const [nextCursor, setNextCursor] = useState(0);

const loadMore = async () => {
  if (loading || nextCursor === null) return;
  
  setLoading(true);
  const response = await fetchFeed(nextCursor);
  
  setData(prev => [...prev, ...response.data]);
  setNextCursor(response.nextCursor);
  setLoading(false);
};

  setLoading(false);
};

// ... in FlashList or FlatList
// Note: If using FlashList, the props are identical to FlatList for this feature.
onEndReached={loadMore}
onEndReachedThreshold={0.5}
```

## Alternative: Custom 'ScrollView' Implementation
If the candidate implemented a custom virtualized list using `ScrollView` (Task 2 Expert):

1.  **State**: They still need `nextCursor` and `data`.
2.  **Trigger**: `onEndReached` doesn't exist on standard `ScrollView`.
    *   They must check scroll position manually in the `onScroll` event.
    *   `if (contentOffset.y + layoutHeight >= contentSize.height - threshold) { loadMore() }`
3.  **Correctness**: Check that they debounce or throttle this check so they don't fire 100 API calls as the user scrolls past the threshold.
