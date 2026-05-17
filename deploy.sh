#!/bin/bash
set -e

PROJECT_DIR="/home/thomas/innerstorm"
WEB_ROOT="/var/www/html/"

cd "$PROJECT_DIR"

echo "Pulling latest..."
git pull origin main

echo "Installing dependencies..."
npm ci

echo "Building project..."
npm run build

echo "Copying stream.php to web root..."
sudo cp server/stream.php "$WEB_ROOT"

echo "Deploying to web root..."
sudo rsync -a dist/ "$WEB_ROOT"

echo "Done."
