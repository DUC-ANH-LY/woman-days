#!/bin/bash

# Production setup script for Vietnamese Women's Day Gift Card Website
# Usage: ./scripts/setup-production.sh your-domain.com your-email@example.com

set -e

# Check if domain and email are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <domain> <email>"
    echo "Example: $0 example.com admin@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo "Setting up production environment for domain: $DOMAIN"
echo "Email: $EMAIL"

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo "Creating .env.prod file..."
    cat > .env.prod << EOF
# Production Environment Variables
NODE_ENV=production
DB_HOST=mysql
DB_USER=womens_day_user
DB_PASSWORD=$(openssl rand -base64 32)
DB_NAME=womens_day_gifts
GEMINI_API_KEY=your_gemini_api_key_here
DOMAIN=$DOMAIN
EMAIL=$EMAIL
PORT=3000
EOF
    echo "Please edit .env.prod and add your actual GEMINI_API_KEY"
    echo "Then run this script again."
    exit 1
fi

# Load environment variables
export $(cat .env.prod | grep -v '^#' | xargs)

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p logs/nginx
mkdir -p public/uploads

# Generate SSL configuration
echo "Generating SSL configuration..."
sed "s/your-domain.com/$DOMAIN/g" nginx/conf.d/ssl-template.conf > nginx/conf.d/default.conf

# Build and start services
echo "Building and starting services..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# Wait for services to start
echo "Waiting for services to start..."
sleep 30

# Initialize SSL certificates
echo "Initializing SSL certificates..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN

# Restart nginx with SSL
echo "Restarting nginx with SSL..."
docker-compose -f docker-compose.prod.yml restart nginx

# Setup cron job for SSL renewal
echo "Setting up SSL certificate auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /bin/bash $(pwd)/scripts/renew-ssl.sh >> /var/log/ssl-renewal.log 2>&1") | crontab -

echo "Production setup complete!"
echo "Your website is now available at: https://$DOMAIN"
echo ""
echo "Next steps:"
echo "1. Update your DNS to point to this server"
echo "2. Test your website functionality"
echo "3. Monitor logs: docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "To stop the services: docker-compose -f docker-compose.prod.yml down"
echo "To restart the services: docker-compose -f docker-compose.prod.yml up -d"

