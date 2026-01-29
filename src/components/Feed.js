import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { fetchFeed } from '../api/mockApi';
import { FeedItem } from './FeedItem';
import { FeedItemSkeleton } from './FeedItemSkeleton';

export const Feed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // TASK 4: Deterministic Data Fetching
  // Currently just fetches the first page.
  // Candidates need to implement pagination using the cursor from the API.
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchFeed(0);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = useCallback(({ item }) => <FeedItem item={item} />, []);

  const getItemLayout = useCallback((data, index) => ({
    length: 410,
    offset: 410 * index,
    index,
  }), []);

  if (loading && data.length === 0) {
    // TASK 1: Layout Stability - Implemented
    return (
      <View style={[styles.container, styles.listContent]}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <FeedItemSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 
        TASK 2: Virtualized List Performance - Advanced Manual Implementation 
      */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        getItemLayout={getItemLayout}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 16,
  },
});
