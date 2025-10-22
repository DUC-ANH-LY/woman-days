#!/bin/bash

# Initialize Let's Encrypt SSL certificates
# Usage: ./scripts/init-letsencrypt.sh your-domain.com your-email@example.com

set -e

# Check if domain and email are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <domain> <email>"
    echo "Example: $0 example.com admin@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo "Initializing Let's Encrypt for domain: $DOMAIN"
echo "Email: $EMAIL"

# Create necessary directories
mkdir -p certbot/conf
mkdir -p certbot/www

# Generate initial SSL configuration
echo "Generating SSL configuration for domain: $DOMAIN"
sed "s/your-domain.com/$DOMAIN/g" nginx/conf.d/ssl-template.conf > nginx/conf.d/default.conf

# Start nginx without SSL first
echo "Starting nginx without SSL..."
docker-compose -f docker-compose.prod.yml up -d nginx

# Wait for nginx to start
echo "Waiting for nginx to start..."
sleep 10

# Request SSL certificate
echo "Requesting SSL certificate from Let's Encrypt..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN

# Restart nginx with SSL
echo "Restarting nginx with SSL configuration..."
docker-compose -f docker-compose.prod.yml restart nginx

echo "SSL certificate initialization complete!"
echo "Your site should now be available at: https://$DOMAIN"

