# Vietnamese Women's Day Gift Card Website - Makefile

.PHONY: help dev prod build clean logs restart stop

# Default target
help:
	@echo "Vietnamese Women's Day Gift Card Website - Available Commands:"
	@echo ""
	@echo "Development:"
	@echo "  dev          - Start development environment"
	@echo "  dev-build    - Build and start development environment"
	@echo "  dev-logs     - View development logs"
	@echo "  dev-stop     - Stop development environment"
	@echo ""
	@echo "Production:"
	@echo "  prod         - Start production environment"
	@echo "  prod-build   - Build and start production environment"
	@echo "  prod-logs    - View production logs"
	@echo "  prod-stop    - Stop production environment"
	@echo ""
	@echo "SSL & Certificates:"
	@echo "  ssl-init     - Initialize SSL certificates (requires domain and email)"
	@echo "  ssl-renew    - Renew SSL certificates"
	@echo ""
	@echo "Utilities:"
	@echo "  build        - Build Docker images"
	@echo "  clean        - Clean up Docker containers and images"
	@echo "  logs         - View all logs"
	@echo "  restart      - Restart all services"
	@echo "  stop         - Stop all services"

# Development commands
dev:
	@echo "Starting development environment..."
	docker-compose up -d

dev-build:
	@echo "Building and starting development environment..."
	docker-compose up -d --build

dev-logs:
	@echo "Viewing development logs..."
	docker-compose logs -f

dev-stop:
	@echo "Stopping development environment..."
	docker-compose down

# Production commands
prod:
	@echo "Starting production environment..."
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

prod-build:
	@echo "Building and starting production environment..."
	docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

prod-logs:
	@echo "Viewing production logs..."
	docker-compose -f docker-compose.prod.yml logs -f

prod-stop:
	@echo "Stopping production environment..."
	docker-compose -f docker-compose.prod.yml down

# SSL commands
ssl-init:
	@echo "Initializing SSL certificates..."
	@read -p "Enter your domain: " domain; \
	read -p "Enter your email: " email; \
	./scripts/init-letsencrypt.sh $$domain $$email

ssl-renew:
	@echo "Renewing SSL certificates..."
	./scripts/renew-ssl.sh

# Utility commands
build:
	@echo "Building Docker images..."
	docker-compose build

clean:
	@echo "Cleaning up Docker containers and images..."
	docker-compose down --rmi all --volumes --remove-orphans
	docker system prune -f

logs:
	@echo "Viewing all logs..."
	docker-compose logs -f

restart:
	@echo "Restarting all services..."
	docker-compose restart

stop:
	@echo "Stopping all services..."
	docker-compose down

# Setup commands
setup-dev:
	@echo "Setting up development environment..."
	chmod +x scripts/*.sh
	./scripts/dev-setup.sh

setup-prod:
	@echo "Setting up production environment..."
	@read -p "Enter your domain: " domain; \
	read -p "Enter your email: " email; \
	chmod +x scripts/*.sh; \
	./scripts/setup-production.sh $$domain $$email

