# Install project dependencies and set up environment
install:
	docker compose up -d --build

# Start Docker containers in detached mode
up:
	docker compose up -d

# Stop and remove Docker containers
down:
	docker compose down

# Build Docker images defined in docker-compose
build:
	docker compose build

# Display help information
help:
	@echo "Available commands:"
	@echo "  install    - Install dependencies and start project containers"
	@echo "  reinstall  - Completely rebuild project (removes volumes, node_modules, etc.)"
	@echo "  up         - Start Docker containers"
	@echo "  down       - Stop Docker containers"
	@echo "  build      - Build Docker images"
	@echo "  help       - Show this help message"