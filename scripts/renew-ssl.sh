#!/bin/bash

# Renew Let's Encrypt SSL certificates
# This script should be run via cron job for automatic renewal

set -e

echo "Starting SSL certificate renewal..."

# Renew certificates
docker-compose -f docker-compose.prod.yml run --rm certbot renew

# Reload nginx configuration
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "SSL certificate renewal complete!"

