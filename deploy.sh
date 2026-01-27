#!/bin/bash

# Numericle Firebase Deployment Script

echo "🎮 Deploying Numericle to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app is live at: https://numericle-b85a9.web.app"
else
    echo "❌ Deployment failed!"
    exit 1
fi
