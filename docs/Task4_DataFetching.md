# Step 4: Deterministic Data Fetching (Cursors)

## Goal
Implement a robust infinite scrolling mechanism.

## Challenge
The app currently fetches a single page of data and stops. Users need to be able to scroll indefinitely. Additionally, paging based on simple offsets (0, 10, 20) can be unreliable if items are added to the top of the feed while the user is scrolling (leading to duplicates).

## Acceptance Criteria
1.  **Infinite List**: The user can scroll to the bottom to load more items.
2.  **Cursor-Based Pagination**: The implementation must utilize the `nextCursor` returned by the API to fetch the correct next page.
3.  **State Integrity**: New data must be *appended* to the existing list.
4.  **UX**: Prevent duplicate requests if a request is already in progress.

## Implementation Tasks
1.  Analyze the `mockApi` response structure.
2.  Refactor the Feed component's state management to handle pagination.
3.  Connect the list's "end reached" event to your data fetching logic.

