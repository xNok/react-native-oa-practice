import React, { useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import { FeedItem } from './FeedItem';
import { FeedItemSkeleton } from './FeedItemSkeleton';

export const Feed = () => {
  const { 
    data, 
    loading, 
    loadMore, 
    loadPrevious, 
    isFetchingMore, 
    isFetchingPrevious,
    hasPrevious 
  } = useFeed();

  const renderItem = useCallback(({ item }) => <FeedItem item={item} />, []);

  const getItemLayout = useCallback((data, index) => ({
    length: 410,
    offset: 410 * index,
    index,
  }), []);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // If scrolled to top (with some threshold) and we have previous items
    if (offsetY < 50 && hasPrevious && !isFetchingPrevious) {
      loadPrevious();
    }
  };

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
      {hasPrevious && isFetchingPrevious && (
         <View style={styles.headerLoader}>
            <ActivityIndicator size="small" />
         </View>
      )}
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
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Trigger scroll event often enough
        
        // TASK 4: Deterministic Data Fetching - Implemented via custom hook
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
  footerLoader: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLoader: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  }
});
