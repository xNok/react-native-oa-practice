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

// ... in FlashList/FlatList
onEndReached={loadMore}
onEndReachedThreshold={0.5}
```
