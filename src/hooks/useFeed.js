import { useState, useEffect, useCallback } from 'react';
import { fetchFeed } from '../api/mockApi';

export const useFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isFetchingPrevious, setIsFetchingPrevious] = useState(false);
  const [nextCursor, setNextCursor] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchFeed(0);
      setData(response.data);
      setNextCursor(response.nextCursor);
      setStartIndex(0);
      setHasMore(response.nextCursor !== null);
    } catch (error) {
      console.error("Failed to load feed", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore || loading) return;

    try {
      setIsFetchingMore(true);
      const response = await fetchFeed(nextCursor);
      
      setData(prevData => {
        const newData = [...prevData, ...response.data];
        // Release memory if list grows too large
        if (newData.length > 100) {
           const slicedData = newData.slice(newData.length - 100);
           setStartIndex(prev => prev + (newData.length - 100)); // Update start index
           return slicedData;
        }
        return newData;
      });
      setNextCursor(response.nextCursor);
      setHasMore(response.nextCursor !== null);
    } catch (error) {
      console.error("Failed to load more items", error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [nextCursor, hasMore, isFetchingMore, loading]);

  const loadPrevious = useCallback(async () => {
    if (isFetchingPrevious || startIndex === 0 || loading) return;

    try {
      setIsFetchingPrevious(true);
      const limit = 10;
      const cursor = Math.max(0, startIndex - limit);
      const actualLimit = startIndex - cursor; // Handle case where < 10 items remain
      
      const response = await fetchFeed(cursor, actualLimit);
      
      setData(prevData => {
        return [...response.data, ...prevData];
      });
      setStartIndex(cursor);
    } catch (error) {
      console.error("Failed to load previous items", error);
    } finally {
      setIsFetchingPrevious(false);
    }
  }, [startIndex, isFetchingPrevious, loading]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    data,
    loading,
    loadMore,
    loadPrevious,
    isFetchingMore,
    isFetchingPrevious,
    hasMore,
    hasPrevious: startIndex > 0
  };
};
