# ChangePilot - Quick Start Guide 🚀

Schnellstartanleitung für ChangePilot in 5 Minuten.

---

## Voraussetzungen

- Node.js 18 oder höher
- Docker & Docker Compose (empfohlen)

---

## Setup in 3 Schritten

### 1. Repository klonen
```bash
git clone <repository-url>
cd flbcoat
```

### 2. Environment-Dateien erstellen
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Mit Docker starten
```bash
docker-compose up -d
```

Die Anwendung ist nun verfügbar unter:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

---

## Ersten Benutzer anlegen

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@changepilot.com",
    "password": "demo123",
    "firstName": "Demo",
    "lastName": "User",
    "role": "CONSULTANT"
  }'
```

---

## Login

Öffne http://localhost:5173 und melde dich mit den Zugangsdaten an:
- **E-Mail**: demo@changepilot.com
- **Passwort**: demo123

---

## Erste Schritte

1. **Projekt erstellen**: Klicke auf "Neues Projekt" und wähle ein Framework (z.B. ADKAR)
2. **Stakeholder hinzufügen**: Navigiere zur Stakeholder-Matrix und füge Stakeholder hinzu
3. **ADKAR tracken**: Öffne den ADKAR-Tracker und setze den Fortschritt
4. **Aufgaben erstellen**: Nutze das Kanban-Board für Aufgabenmanagement

---

## Manuelle Installation (ohne Docker)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# PostgreSQL muss laufen und in .env konfiguriert sein
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Hilfe & Support

- Vollständige Dokumentation: siehe [README.md](README.md)
- Website: https://www.flb.co.at
- E-Mail: info@flb.co.at

---

**Viel Erfolg mit ChangePilot!** 🎉
