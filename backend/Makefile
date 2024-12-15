DOCKER_COMPOSE = docker compose
DOCKER_EXEC = $(DOCKER_COMPOSE) exec php
SYMFONY = $(DOCKER_EXEC) php bin/console
COMPOSER = $(DOCKER_EXEC) composer

YELLOW = \033[33m
RED = \033[31m
GREEN = \033[32m
RESET = \033[0m

## —— Main commands ———————————————————————————————————————————————————————————————
help: ## List all commands
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Project Setup ——————————————————————————————————————————————————————————————
project-install: ## Complete project installation
	@echo "$(GREEN)Project installation...$(RESET)"

	@echo "$(GREEN)Building containers...$(RESET)"
	$(DOCKER_COMPOSE) build
	
	@echo "$(GREEN)Starting containers...$(RESET)"
	$(DOCKER_COMPOSE) up -d
	
	@echo "$(YELLOW)Waiting for containers to be ready...$(RESET)"
	sleep 10

	@echo "$(YELLOW)Installing composer dependencies...$(RESET)"
	$(COMPOSER) install
	
	@echo "$(YELLOW)Creating .env.local file...$(RESET)"
	@if [ ! -f .env.local ]; then \
		cp .env .env.local; \
		sed -i 's#DATABASE_URL=.*#DATABASE_URL="mysql://app:app@database:3306/app?serverVersion=mariadb-10.11.0"#' .env.local; \
		echo "$(GREEN).env.local file created and configured$(RESET)"; \
	else \
		echo "$(YELLOW).env.local file already exists$(RESET)"; \
	fi
	
	@echo "$(YELLOW)Generating JWT keys...$(RESET)"
	$(SYMFONY) lexik:jwt:generate-keypair --skip-if-exists --no-interaction
	
	@echo "$(YELLOW)Creating database...$(RESET)"
	$(SYMFONY) doctrine:database:drop --force --if-exists
	$(SYMFONY) doctrine:database:create --if-not-exists
	
	@echo "$(YELLOW)Updating database schema...$(RESET)"
	$(SYMFONY) doctrine:schema:update --force
	
	@echo "$(YELLOW)Loading fixtures...$(RESET)"
	$(SYMFONY) doctrine:fixtures:load --no-interaction
	
	@echo "$(YELLOW)Clearing cache...$(RESET)"
	$(SYMFONY) cache:clear
	
	@echo "$(GREEN)Installation completed successfully!$(RESET)"
	@echo "$(GREEN)API is accessible at: http://localhost:8080/api$(RESET)"
	@echo "$(GREEN)Documentation is available at: http://localhost:8080/api/docs$(RESET)"

project-reinstall: ## Reinstall project (clear everything and reinstall)
	@echo "$(RED)Starting complete project reinstallation...$(RESET)"
	
	@echo "$(RED)Stopping all containers...$(RESET)"
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
	
	@echo "$(YELLOW)Removing vendor directory...$(RESET)"
	rm -rf vendor
	
	@echo "$(YELLOW)Removing var directory...$(RESET)"
	rm -rf var
	
	@echo "$(YELLOW)Removing JWT keys...$(RESET)"
	rm -rf config/jwt

	@echo "$(YELLOW)Removing .env.local...$(RESET)"
	rm -f .env.local
	
	@echo "$(GREEN)Rebuilding containers...$(RESET)"
	$(DOCKER_COMPOSE) build
	
	@echo "$(GREEN)Starting containers...$(RESET)"
	$(DOCKER_COMPOSE) up -d
	
	@echo "$(YELLOW)Waiting for containers to be ready...$(RESET)"
	sleep 10
	
	@echo "$(GREEN)Running project installation...$(RESET)"
	$(MAKE) project-install

## —— Docker ————————————————————————————————————————————————————————————————————
build: ## Build your Docker
	@echo "$(GREEN)Building containers...$(RESET)"
	$(DOCKER_COMPOSE) build

dev-start: ## Start containers
	@echo "$(GREEN)Starting containers...$(RESET)"
	$(DOCKER_COMPOSE) up -d

dev-stop: ## Stop containers
	@echo "$(RED)Stopping containers...$(RESET)"
	$(DOCKER_COMPOSE) down

dev-restart: ## Restart containers
	@echo "$(YELLOW)Restarting containers...$(RESET)"
	$(MAKE) dev-stop
	$(MAKE) dev-start

docker-ps: ## Display containers status
	@echo "$(YELLOW)Containers status:$(RESET)"
	$(DOCKER_COMPOSE) ps

logs: ## Display containers logs
	$(DOCKER_COMPOSE) logs -f

## —— PHP ————————————————————————————————————————————————————————————————————
php: ## Enter PHP container with bash
	@echo "$(YELLOW)Connecting to PHP container...$(RESET)"
	$(DOCKER_COMPOSE) exec php bash

## —— Symfony ————————————————————————————————————————————————————————————————————
sf: ## List all Symfony commands
	$(SYMFONY)

cache-clear: ## Clear cache
	@echo "$(YELLOW)Clearing cache...$(RESET)"
	$(SYMFONY) cache:clear

migrate: ## Run migrations
	@echo "$(YELLOW)Running migrations...$(RESET)"
	$(SYMFONY) doctrine:migrations:migrate --no-interaction

fixtures: ## Load fixtures
	@echo "$(YELLOW)Loading fixtures...$(RESET)"
	$(SYMFONY) doctrine:fixtures:load --no-interaction

database-init: ## Reset database
	@echo "$(RED)Dropping database...$(RESET)"
	$(SYMFONY) doctrine:database:drop --force --if-exists
	@echo "$(YELLOW)Creating database...$(RESET)"
	$(SYMFONY) doctrine:database:create
	@echo "$(YELLOW)Creating schema...$(RESET)"
	$(SYMFONY) doctrine:schema:create
	@echo "$(GREEN)Database initialized!$(RESET)"

## —— Migrations ———————————————————————————————————————————————————————————————————
migration-diff: ## Create a new migration by comparing entities to database
	@echo "$(YELLOW)Creating new migration...$(RESET)"
	$(SYMFONY) doctrine:migrations:diff

migration-generate: ## Generate a blank migration class
	@echo "$(YELLOW)Generating new migration...$(RESET)"
	$(SYMFONY) doctrine:migrations:generate

migration-migrate: ## Execute migrations
	@echo "$(YELLOW)Executing migrations...$(RESET)"
	$(SYMFONY) doctrine:migrations:migrate --no-interaction

migration-status: ## Show migrations status
	@echo "$(YELLOW)Migrations status...$(RESET)"
	$(SYMFONY) doctrine:migrations:status

migration-latest: ## Migrate to latest version
	@echo "$(YELLOW)Migrating to latest version...$(RESET)"
	$(SYMFONY) doctrine:migrations:migrate latest --no-interaction

migration-rollback: ## Rollback last migration
	@echo "$(YELLOW)Rolling back last migration...$(RESET)"
	$(SYMFONY) doctrine:migrations:migrate prev --no-interaction

## —— Composer ———————————————————————————————————————————————————————————————————
composer-install: ## Install dependencies
	@echo "$(YELLOW)Installing dependencies...$(RESET)"
	$(COMPOSER) install

composer-update: ## Update dependencies
	@echo "$(YELLOW)Updating dependencies...$(RESET)"
	$(COMPOSER) update

## —— Code Quality ————————————————————————————————————————————————————————————————
lint: ## Check code quality
	$(DOCKER_EXEC) vendor/bin/php-cs-fixer fix --dry-run --diff

fix: ## Fix code quality
	$(DOCKER_EXEC) vendor/bin/php-cs-fixer fix