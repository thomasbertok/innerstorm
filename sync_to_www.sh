#!/bin/bash
set -e

PROJECT_DIR="/home/thomas/innerstorm"
WEB_ROOT="/var/www/html/"

echo "Deploying to web root..."
sudo rsync -a dist/ "$WEB_ROOT"

echo "Done."
