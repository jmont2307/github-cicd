#!/bin/bash
# This script runs when the app starts on Render

# Print some debug info
echo "Starting app on Render..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "MongoDB URI configured: $(if [ ! -z "$MONGODB_URI" ]; then echo "Yes"; else echo "No"; fi)"

# Start the application
npm start