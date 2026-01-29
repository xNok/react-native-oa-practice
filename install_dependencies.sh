#!/bin/bash

echo "Installing project dependencies..."
npm install

echo "Installing specific dependencies for the interview tasks..."
npx expo install @shopify/flash-list expo-image

echo "Dependencies installed successfully."
