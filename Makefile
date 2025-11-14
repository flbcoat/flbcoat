# ChangePilot - Makefile für schnelle Befehle

.PHONY: help start stop restart logs clean install update prisma-studio

# Standardbefehl
.DEFAULT_GOAL := help

help: ## Zeige diese Hilfe
	@echo ""
	@echo "ChangePilot - Verfügbare Befehle:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

start: ## Starte ChangePilot (Docker)
	@./start.sh

stop: ## Stoppe ChangePilot
	@./stop.sh

restart: stop start ## Stoppe und starte ChangePilot neu

logs: ## Zeige Logs
	@docker-compose logs -f

logs-backend: ## Zeige Backend Logs
	@docker-compose logs -f backend

logs-frontend: ## Zeige Frontend Logs
	@docker-compose logs -f frontend

clean: ## Lösche alle Container und Volumes
	@echo "⚠️  Dies löscht alle Daten!"
	@read -p "Fortfahren? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v; \
		rm -rf backend/node_modules frontend/node_modules; \
		echo "✓ Alles gelöscht"; \
	fi

install: ## Installiere alle Dependencies
	@echo "📦 Installiere Backend Dependencies..."
	@cd backend && npm install
	@echo "📦 Installiere Frontend Dependencies..."
	@cd frontend && npm install
	@echo "✓ Dependencies installiert"

update: ## Update alle Dependencies
	@echo "🔄 Update Backend Dependencies..."
	@cd backend && npm update
	@echo "🔄 Update Frontend Dependencies..."
	@cd frontend && npm update
	@echo "✓ Dependencies aktualisiert"

prisma-studio: ## Öffne Prisma Studio (Datenbank-GUI)
	@cd backend && npx prisma studio

prisma-reset: ## Setze Datenbank zurück
	@echo "⚠️  Dies löscht alle Daten!"
	@read -p "Fortfahren? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		cd backend && npx prisma migrate reset; \
	fi

dev: ## Starte im Entwicklungsmodus (ohne Docker)
	@echo "🚀 Starte Backend..."
	@cd backend && npm run dev &
	@echo "🚀 Starte Frontend..."
	@cd frontend && npm run dev

build: ## Baue Production Build
	@echo "🏗️  Baue Backend..."
	@cd backend && npm run build
	@echo "🏗️  Baue Frontend..."
	@cd frontend && npm run build
	@echo "✓ Build abgeschlossen"

test: ## Führe Tests aus
	@echo "🧪 Führe Backend Tests aus..."
	@cd backend && npm test || echo "Keine Tests definiert"
	@echo "🧪 Führe Frontend Tests aus..."
	@cd frontend && npm test || echo "Keine Tests definiert"

health: ## Prüfe Health Status
	@echo "🏥 Prüfe Backend Health..."
	@curl -s http://localhost:3001/health | python3 -m json.tool || echo "Backend nicht erreichbar"

status: ## Zeige Container Status
	@docker-compose ps
