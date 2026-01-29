# React Native Performance & Optimization Practice

Welcome to the React Native Technical Assessment. This repository is designed to test your ability to optimize a React Native application for performance, user experience, and stability.

## 🚀 Getting Started

1.  **Install Dependencies**
    Run the setup script to install all necessary packages.
    ```bash
    npm run setup
    # OR
    npm install && npx expo install @shopify/flash-list expo-image
    ```

2.  **Start the Server**
    ```bash
    npm start
    ```
    This will start the Metro Bundler. You can press `w` to run in the web browser, or use the Expo Go app on your physical device.

## 📝 The Challenge

You will be working on a simple "Feed" application that currently suffers from several UX and performance issues. 

Your goal is to complete **4 Key Optimization Tasks**. Detailed instructions for each task can be found in the `docs/` folder.

| Order | Task | Focus | Description |
| :--- | :--- | :--- | :--- |
| 1 | [Layout Stability](docs/Task1_LayoutStability.md) | UX | Prevent layout shifts using Skeletons. |
| 2 | [Virtualized List Performance](docs/Task2_VirtualizedList.md) | Performance | Maintain 60 FPS using `FlashList`. |
| 3 | [Asset Optimization](docs/Task3_AssetOptimization.md) | Performance | Progressive image loading with BlurHash. |
| 4 | [Deterministic Data Fetching](docs/Task4_DataFetching.md) | Stability | Implement cursor-based infinite scrolling. |

## 📂 Project Structure

- **`src/api/`**: Contains a standard mock API simulating network delay.
- **`src/components/`**: Contains the UI components (`Feed.js`, `FeedItem.js`).
- **`docs/`**: Instructions for each task.

## ⚠️ Guidelines

- You are allowed to use documentation (React Native, Expo, libraries).
- Focus on code quality and best practices.
- Do not modify the `mockApi.js` logic (unless for debugging), treat it as a fixed backend service.
- **Have fun!**