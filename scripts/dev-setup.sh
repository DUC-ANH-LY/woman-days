#!/bin/bash

# Development setup script for Vietnamese Women's Day Gift Card Website

set -e

echo "Setting up development environment..."

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file for development..."
    cat > .env << EOF
# Development Environment Variables
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=womens_day_gifts
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
BASE_URL=http://localhost:3000
EOF
    echo "Please edit .env and add your actual GEMINI_API_KEY"
    echo "Then run this script again."
    exit 1
fi

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p public/uploads
mkdir -p logs

# Build and start development services
echo "Building and starting development services..."
docker-compose up -d --build

# Wait for services to start
echo "Waiting for services to start..."
sleep 30

# Check if services are running
echo "Checking service status..."
docker-compose ps

echo "Development setup complete!"
echo ""
echo "Your development environment is now running:"
echo "- Website: http://localhost:3000"
echo "- phpMyAdmin: http://localhost:8080"
echo "- MySQL: localhost:3306"
echo ""
echo "To stop the services: docker-compose down"
echo "To view logs: docker-compose logs -f"
echo "To restart: docker-compose restart"

