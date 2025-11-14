# 🚀 ChangePilot - Sofort starten!

## Ein-Klick-Start

### **macOS / Linux**

```bash
./start.sh
```

### **Windows**

Doppelklick auf `start.bat` oder:
```cmd
start.bat
```

Das war's! 🎉

---

## Was passiert automatisch?

Das Start-Script erledigt alles für dich:

1. ✅ Prüft Node.js & Docker
2. ✅ Erstellt Environment-Dateien
3. ✅ Startet Docker Container (PostgreSQL, Backend, Frontend)
4. ✅ Installiert Dependencies
5. ✅ Migriert Datenbank
6. ✅ Erstellt Demo-Benutzer
7. ✅ Öffnet Browser

---

## Login-Daten

- **URL**: http://localhost:5173
- **E-Mail**: demo@changepilot.com
- **Passwort**: demo123

---

## Stoppen

### **macOS / Linux**
```bash
./stop.sh
```

### **Windows**
```cmd
stop.bat
```

---

## Alternative: Makefile-Befehle (macOS/Linux)

```bash
make start          # Starte ChangePilot
make stop           # Stoppe ChangePilot
make restart        # Neu starten
make logs           # Logs anzeigen
make prisma-studio  # Datenbank-GUI öffnen
make clean          # Alles zurücksetzen
make help           # Alle Befehle anzeigen
```

---

## Probleme?

### **"Docker läuft nicht"**
- Starte Docker Desktop
- Warte bis "Docker Desktop is running"
- Führe `./start.sh` erneut aus

### **"Port already in use"**
```bash
# macOS/Linux
./stop.sh
./start.sh

# Windows
stop.bat
start.bat
```

### **Alles zurücksetzen**
```bash
# macOS/Linux
make clean
./start.sh

# Windows
docker-compose down -v
start.bat
```

---

## Dokumentation

- **Vollständige Docs**: [README.md](README.md)
- **Schnellstart**: [QUICKSTART.md](QUICKSTART.md)

---

**Viel Erfolg mit ChangePilot!** 🚀
