import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const AnimatedView = ({ style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[style, { opacity }]} />;
};

export const FeedItemSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedView style={styles.avatar} />
        <AnimatedView style={styles.title} />
      </View>
      
      <AnimatedView style={styles.image} />
      
      <View style={styles.descriptionContainer}>
         <AnimatedView style={styles.textLine} />
         <AnimatedView style={[styles.textLine, { width: '80%' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  title: {
    height: 16,
    width: 120,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#E0E0E0',
  },
  descriptionContainer: {
    padding: 12,
  },
  textLine: {
    height: 14,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
    borderRadius: 4,
  }
});
