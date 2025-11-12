#!/bin/bash

# ChangePilot - One-Click Start Script
# Dieses Script startet die gesamte Anwendung automatisch

set -e  # Bei Fehler abbrechen

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║      ChangePilot - Quick Start        ║"
echo "║   Change Management Platform 🚀       ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Funktion für Erfolgsmeldungen
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Funktion für Warnungen
warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Funktion für Fehler
error() {
    echo -e "${RED}✗ $1${NC}"
}

# Funktion für Info
info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Prüfe Voraussetzungen
info "Prüfe Voraussetzungen..."

# Prüfe Node.js
if ! command -v node &> /dev/null; then
    error "Node.js ist nicht installiert!"
    echo "Bitte installiere Node.js >= 18.x von: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js Version $NODE_VERSION ist zu alt. Mindestens Version 18 erforderlich."
    exit 1
fi
success "Node.js $(node -v) gefunden"

# Prüfe Docker
if ! command -v docker &> /dev/null; then
    warning "Docker ist nicht installiert!"
    echo "Starte ohne Docker (benötigt PostgreSQL)..."
    USE_DOCKER=false
else
    if ! docker info &> /dev/null; then
        warning "Docker läuft nicht!"
        echo "Bitte starte Docker Desktop und führe dieses Script erneut aus."
        exit 1
    fi
    success "Docker ist bereit"
    USE_DOCKER=true
fi

# Environment-Dateien erstellen
info "Erstelle Environment-Dateien..."

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    success "backend/.env erstellt"
else
    info "backend/.env existiert bereits"
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    success "frontend/.env erstellt"
else
    info "frontend/.env existiert bereits"
fi

# Starte mit Docker
if [ "$USE_DOCKER" = true ]; then
    info "Starte Docker Container..."

    # Stoppe alte Container
    docker-compose down &> /dev/null || true

    # Starte Container
    docker-compose up -d
    success "Docker Container gestartet"

    # Warte auf PostgreSQL
    info "Warte auf PostgreSQL..."
    sleep 5

    # Installiere Backend Dependencies (falls nötig)
    if [ ! -d "backend/node_modules" ]; then
        info "Installiere Backend Dependencies..."
        cd backend
        npm install --silent
        cd ..
        success "Backend Dependencies installiert"
    fi

    # Prisma Setup
    info "Initialisiere Datenbank..."
    cd backend
    npx prisma generate &> /dev/null

    # Prüfe ob Datenbank bereits migriert ist
    if npx prisma migrate status 2>&1 | grep -q "Database schema is up to date"; then
        info "Datenbank ist bereits aktuell"
    else
        npx prisma migrate deploy &> /dev/null || npx prisma migrate dev --name init &> /dev/null
        success "Datenbank migriert"
    fi
    cd ..

    # Erstelle Demo-User (falls noch nicht vorhanden)
    info "Erstelle Demo-Benutzer..."
    sleep 2

    RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/register \
        -H "Content-Type: application/json" \
        -d '{
            "email": "demo@changepilot.com",
            "password": "demo123",
            "firstName": "Demo",
            "lastName": "User",
            "role": "CONSULTANT"
        }' 2>/dev/null || echo '{"error":"exists"}')

    if echo "$RESPONSE" | grep -q "error"; then
        info "Demo-Benutzer existiert bereits"
    else
        success "Demo-Benutzer erstellt"
    fi

    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                           ║${NC}"
    echo -e "${GREEN}║  🎉 ChangePilot läuft erfolgreich!                       ║${NC}"
    echo -e "${GREEN}║                                                           ║${NC}"
    echo -e "${GREEN}║  Frontend:  ${BLUE}http://localhost:5173${GREEN}                      ║${NC}"
    echo -e "${GREEN}║  Backend:   ${BLUE}http://localhost:3001${GREEN}                      ║${NC}"
    echo -e "${GREEN}║                                                           ║${NC}"
    echo -e "${GREEN}║  Login:                                                   ║${NC}"
    echo -e "${GREEN}║  📧 Email:    ${YELLOW}demo@changepilot.com${GREEN}                   ║${NC}"
    echo -e "${GREEN}║  🔑 Password: ${YELLOW}demo123${GREEN}                                ║${NC}"
    echo -e "${GREEN}║                                                           ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    info "Logs anzeigen: ${YELLOW}docker-compose logs -f${NC}"
    info "Stoppen: ${YELLOW}docker-compose down${NC}"
    info "Prisma Studio: ${YELLOW}cd backend && npx prisma studio${NC}"
    echo ""

    # Öffne Browser (optional)
    if command -v open &> /dev/null; then
        info "Öffne Browser..."
        sleep 2
        open http://localhost:5173
    elif command -v xdg-open &> /dev/null; then
        info "Öffne Browser..."
        sleep 2
        xdg-open http://localhost:5173
    fi

# Starte ohne Docker (manuell)
else
    error "Docker nicht verfügbar. Bitte installiere Docker oder starte manuell:"
    echo ""
    echo "1. PostgreSQL installieren und starten"
    echo "2. cd backend && npm install && npm run dev"
    echo "3. cd frontend && npm install && npm run dev"
    exit 1
fi
