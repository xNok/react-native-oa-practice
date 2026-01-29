# Step 4: Deterministic Data Fetching (Cursors)

## Goal
Avoid duplicate data or "jumps" in the feed.

## Action
Use Cursor-based Pagination (e.g., after_id) rather than page offsets.

## Benefit
Ensures a stable list even if the underlying database updates while the user is scrolling.

## Implementation Tasks
1. Open `src/components/Feed.js`.
2. Inspect `src/api/mockApi.js` to understand how `fetchFeed(cursor)` works.
3. Modify the state in `Feed.js` to store the `nextCursor` returned by the API.
4. Update `loadData` (or create a `loadMore` function) that:
   - Uses the `nextCursor` for subsequent calls.
   - Appends new data to the existing `data` array instead of overwriting it.
5. Hook this function up to the `onEndReached` prop of the List component.

