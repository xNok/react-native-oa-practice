import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export const FeedItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <View style={styles.avatar} />
         <Text style={styles.title}>{item.title}</Text>
      </View>
      
      {/* 
        TASK 3: Asset Optimization - Implemented
        Using expo-image with blurhash placeholder and transition.
      */}
      <Image 
        source={item.image} 
        style={styles.image}
        placeholder={item.blurhash}
        contentFit="cover"
        transition={1000}
      />
      
      <Text style={styles.description}>{item.description}</Text>
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
    backgroundColor: '#eee',
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  description: {
    padding: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
