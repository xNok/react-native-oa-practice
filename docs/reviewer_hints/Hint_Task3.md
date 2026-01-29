# Reviewer Hints: Asset Optimization

## Problem
The `Image` component from `react-native` waits until the full image is downloaded to show anything (or shows white space). We want a progressive load using the `blurhash`.

## What to look for
1.  **Dependency**: Importing `Image` from `expo-image` (NOT `react-native`).
2.  **Props**:
    *   `source`: Should be the image URI.
    *   `placeholder`: Should be the `item.blurhash`.
    *   `contentFit` (optional but good): 'cover'.
    *   `transition`: A duration (e.g., 1000) makes the fade-in from the blurhash to the real image looks smooth.

## Better solution Code Snippet
```javascript
import { Image } from 'expo-image';

// In FeedItem.js
<Image
  style={styles.image}
  source={item.image}
  placeholder={{ blurhash: item.blurhash }}
  contentFit="cover"
  transition={1000}
/>
```
