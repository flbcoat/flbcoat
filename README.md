# ChangePilot 🚀

**All-in-One-Plattform für Change-Berater**

ChangePilot ist eine umfassende Webanwendung, die Change-Management-Berater bei der Planung, Durchführung und Überwachung von Transformationsprojekten unterstützt. Die Plattform kombiniert bewährte Frameworks (ADKAR, Kotter, Lewin, Agile) mit modernen Tools für Projektmanagement, Stakeholder-Analyse und Kommunikation.

---

## 🎯 Hauptfunktionen

### 1. **Dashboard**
- Übersicht aller Projekte
- KPI-Tracking (Stakeholder, Aufgaben, Meilensteine)
- Schnellzugriff auf wichtige Funktionen

### 2. **Projektmanagement**
- Projekte nach verschiedenen Change-Frameworks anlegen (ADKAR, Kotter, Lewin, Agile)
- Status-Tracking und Fortschrittsüberwachung
- Mandantenfähigkeit für mehrere Kundenprojekte

### 3. **Stakeholder-Management**
- **Power-Interest-Grid** für visuelle Stakeholder-Analyse
- Klassifizierung nach Einfluss, Interesse und Haltung
- Detaillierte Stakeholder-Profile mit Notizen

### 4. **ADKAR-Framework-Tracker**
- Fortschrittsverfolgung durch alle 5 ADKAR-Phasen:
  - Awareness (Bewusstsein)
  - Desire (Wunsch)
  - Knowledge (Wissen)
  - Ability (Fähigkeit)
  - Reinforcement (Verstärkung)
- Prozentuale Fortschrittsanzeige pro Phase
- Notizen und Dokumentation

### 5. **Kanban-Board**
- Visuelles Aufgabenmanagement
- 4 Spalten: To Do, In Progress, Review, Done
- Prioritätensetzung (Niedrig, Mittel, Hoch, Kritisch)
- Aufgaben-Zuweisung an Teammitglieder

### 6. **Authentifizierung & Multi-Tenancy**
- Sichere JWT-basierte Authentifizierung
- Rollenbasierte Zugriffskontrolle (Admin, Consultant, Client)
- Mandantenfähigkeit für isolierte Kundenprojekte

---

## 🛠️ Technologie-Stack

### **Frontend**
- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Material-UI (MUI)** für modernes Design
- **Zustand** für State Management
- **React Router** für Navigation
- **Axios** für API-Kommunikation

### **Backend**
- **Node.js** mit Express
- **TypeScript** für Type-Safety
- **Prisma ORM** für Datenbankzugriff
- **JWT** für Authentifizierung
- **bcryptjs** für Passwort-Hashing

### **Datenbank**
- **PostgreSQL 15**

### **DevOps**
- **Docker** & **Docker Compose**
- Environment-basierte Konfiguration

---

## 📦 Installation & Setup

### **Voraussetzungen**
- Node.js >= 18.x
- Docker & Docker Compose (optional, aber empfohlen)
- PostgreSQL 15 (wenn nicht Docker)

### **Option 1: Mit Docker (Empfohlen)**

1. **Repository klonen:**
```bash
git clone <repository-url>
cd flbcoat
```

2. **Environment-Variablen einrichten:**
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. **Docker Container starten:**
```bash
docker-compose up -d
```

4. **Datenbank migrieren:**
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
```

5. **Anwendung öffnen:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

### **Option 2: Manuelle Installation**

#### **Backend Setup**
```bash
cd backend
npm install

# .env Datei konfigurieren
cp .env.example .env
# Dann .env mit Datenbankverbindung anpassen

# Prisma Setup
npx prisma generate
npx prisma migrate dev

# Server starten
npm run dev
```

#### **Frontend Setup**
```bash
cd frontend
npm install

# .env Datei konfigurieren
cp .env.example .env

# Dev-Server starten
npm run dev
```

---

## 🚀 Verwendung

### **1. Ersten Benutzer anlegen**

Da noch kein Benutzer existiert, registrieren Sie sich über die API:

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

### **2. Login**

Öffnen Sie http://localhost:5173 und melden Sie sich mit den erstellten Zugangsdaten an.

### **3. Projekt erstellen**

1. Klicken Sie auf "Neues Projekt"
2. Geben Sie Projektname und Beschreibung ein
3. Wählen Sie ein Framework (z. B. ADKAR)
4. Klicken Sie auf "Erstellen"

### **4. Stakeholder hinzufügen**

1. Öffnen Sie ein Projekt
2. Navigieren Sie zur Stakeholder-Matrix
3. Klicken Sie auf "Stakeholder hinzufügen"
4. Füllen Sie die Details aus (Einfluss, Interesse, Haltung)

### **5. ADKAR-Tracking**

1. Öffnen Sie ein Projekt mit ADKAR-Framework
2. Navigieren Sie zum ADKAR-Tracker
3. Bearbeiten Sie jede Phase und setzen Sie den Fortschritt

### **6. Aufgaben verwalten**

1. Öffnen Sie das Kanban-Board
2. Erstellen Sie neue Aufgaben
3. Verschieben Sie Aufgaben zwischen den Spalten

---

## 📊 Datenmodell

### **Hauptentitäten**

- **User**: Benutzer mit Rollen (Admin, Consultant, Client)
- **Tenant**: Mandant für Multi-Tenancy
- **Project**: Projekt mit Framework-Auswahl
- **Stakeholder**: Stakeholder mit Power-Interest-Klassifizierung
- **Task**: Aufgabe im Kanban-Board
- **AdkarProgress**: ADKAR-Phasen-Tracking
- **KotterStep**: Kotter's 8-Schritte-Tracking
- **Milestone**: Projekt-Meilensteine
- **Comment**: Kommentare zu Aufgaben

### **Change-Frameworks**

- **ADKAR**: 5 Phasen (Awareness → Reinforcement)
- **Kotter**: 8 Schritte
- **Lewin**: 3 Phasen (Unfreeze → Change → Refreeze)
- **Agile**: Iterative Change-Management-Prozesse
- **Custom**: Benutzerdefinierte Frameworks

---

## 🔌 API-Endpunkte

### **Authentifizierung**
- `POST /api/auth/register` - Neuen Benutzer registrieren
- `POST /api/auth/login` - Anmelden

### **Projekte**
- `GET /api/projects` - Alle Projekte abrufen
- `GET /api/projects/:id` - Einzelnes Projekt abrufen
- `POST /api/projects` - Neues Projekt erstellen
- `PUT /api/projects/:id` - Projekt aktualisieren
- `DELETE /api/projects/:id` - Projekt löschen

### **Stakeholder**
- `GET /api/stakeholders/project/:projectId` - Stakeholder eines Projekts
- `POST /api/stakeholders` - Neuen Stakeholder erstellen
- `PUT /api/stakeholders/:id` - Stakeholder aktualisieren
- `DELETE /api/stakeholders/:id` - Stakeholder löschen

### **Aufgaben**
- `GET /api/tasks/project/:projectId` - Aufgaben eines Projekts
- `POST /api/tasks` - Neue Aufgabe erstellen
- `PUT /api/tasks/:id` - Aufgabe aktualisieren
- `DELETE /api/tasks/:id` - Aufgabe löschen
- `POST /api/tasks/:id/comments` - Kommentar hinzufügen

### **ADKAR**
- `GET /api/adkar/project/:projectId` - ADKAR-Fortschritt abrufen
- `PUT /api/adkar/:id` - ADKAR-Phase aktualisieren

### **Kotter**
- `GET /api/kotter/project/:projectId` - Kotter-Schritte abrufen
- `PUT /api/kotter/:id` - Kotter-Schritt aktualisieren

---

## 🎨 Design-Prinzipien

- **Modern & Minimalistisch**: Klares, aufgeräumtes Design mit Material-UI
- **Intuitiv**: Einfache Navigation und selbsterklärende Funktionen
- **Responsiv**: Funktioniert auf Desktop, Tablet und Smartphone
- **Visuell**: Grafische Darstellungen (Power-Interest-Grid, Fortschrittsbalken)
- **Professionell**: Geeignet für Beratungsprojekte und Kundenpräsentationen

---

## 🔒 Sicherheit

- **JWT-Authentifizierung** mit 7-Tage-Gültigkeit
- **Passwort-Hashing** mit bcrypt
- **CORS-Schutz** konfigurierbar
- **Rollenbasierte Zugriffskontrolle**
- **SQL-Injection-Schutz** durch Prisma ORM
- **Environment-basierte Secrets**

---

## 🚧 Roadmap & Erweiterungen

### **Phase 2 (Geplant)**
- Kommunikationsplaner mit Vorlagen
- Schulungsmodul mit Lernpfaden
- Umfrage-Tool für Widerstandsanalyse
- KI-Assistent für Empfehlungen
- Reporting & Analytics (PDF/PPT-Export)
- E-Mail-Integration (Benachrichtigungen)
- Kalender-Integration (Google Calendar, Outlook)
- Dokumentenmanagement (Datei-Upload)

### **Phase 3 (Vision)**
- Predictive Analytics (KI-basierte Risikoanalyse)
- Multi-Sprach-Unterstützung (EN, DE, NO)
- Mobile App (iOS & Android)
- White-Label-Option für Kunden
- Integration mit LMS (Moodle, LinkedIn Learning)
- Video-Konferenz-Integration (Zoom, Teams)

---

## 💼 Use Cases

### **Use Case 1: KI-Einführung bei Finanzunternehmen**
1. Projekt "KI-Einführung" mit ADKAR-Framework erstellen
2. Stakeholder erfassen (Management, IT, Fachabteilungen)
3. Power-Interest-Grid analysieren
4. ADKAR-Phasen durchlaufen und dokumentieren
5. Schulungen planen und tracken
6. Widerstand identifizieren und Maßnahmen ableiten

### **Use Case 2: Blockchain-Pilot in Norwegen**
1. Projekt "Blockchain-Pilot" anlegen
2. Norwegische Stakeholder mit kulturellen Besonderheiten erfassen
3. Kanban-Board für agiles Vorgehen nutzen
4. Meilensteine setzen (z. B. Proof-of-Concept)
5. Fortschritt transparent mit Kunden teilen

### **Use Case 3: Digitalisierung öffentlicher Verwaltung**
1. Großprojekt mit mehreren Abteilungen
2. Umfangreiche Stakeholder-Analyse (100+ Personen)
3. Kotter's 8-Schritte-Modell anwenden
4. Regelmäßige Fortschrittsberichte generieren
5. Change-Champions identifizieren und aktivieren

---

## 📄 Lizenz

MIT License

---

## 📞 Kontakt

**FLB Consulting**
- Website: https://www.flb.co.at
- E-Mail: info@flb.co.at

---

**ChangePilot - Ihr Begleiter für erfolgreiche Transformationen!** 🚀

