import { useState, useEffect, useCallback } from 'react';
import { fetchFeed } from '../api/mockApi';

export const useFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchFeed(0);
      setData(response.data);
      setNextCursor(response.nextCursor);
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
      
      setData(prevData => [...prevData, ...response.data]);
      setNextCursor(response.nextCursor);
      setHasMore(response.nextCursor !== null);
    } catch (error) {
      console.error("Failed to load more items", error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [nextCursor, hasMore, isFetchingMore, loading]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    data,
    loading,
    loadMore,
    isFetchingMore,
    hasMore
  };
};
