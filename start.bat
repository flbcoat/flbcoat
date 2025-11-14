@echo off
REM ChangePilot - One-Click Start Script für Windows
REM Dieses Script startet die gesamte Anwendung automatisch

echo.
echo ╔═══════════════════════════════════════╗
echo ║      ChangePilot - Quick Start        ║
echo ║   Change Management Platform          ║
echo ╚═══════════════════════════════════════╝
echo.

REM Prüfe Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] Node.js ist nicht installiert!
    echo Bitte installiere Node.js von: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js gefunden:
node -v

REM Prüfe Docker
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNUNG] Docker ist nicht installiert!
    echo Bitte installiere Docker Desktop von: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

docker info >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] Docker läuft nicht!
    echo Bitte starte Docker Desktop und führe dieses Script erneut aus.
    pause
    exit /b 1
)
echo [OK] Docker ist bereit

REM Environment-Dateien erstellen
echo.
echo [INFO] Erstelle Environment-Dateien...

if not exist "backend\.env" (
    copy backend\.env.example backend\.env >nul
    echo [OK] backend\.env erstellt
) else (
    echo [INFO] backend\.env existiert bereits
)

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env >nul
    echo [OK] frontend\.env erstellt
) else (
    echo [INFO] frontend\.env existiert bereits
)

REM Stoppe alte Container
echo.
echo [INFO] Stoppe alte Container...
docker-compose down >nul 2>nul

REM Starte Docker Container
echo [INFO] Starte Docker Container...
docker-compose up -d
if %ERRORLEVEL% NEQ 0 (
    echo [FEHLER] Docker Container konnten nicht gestartet werden!
    pause
    exit /b 1
)
echo [OK] Docker Container gestartet

REM Warte auf PostgreSQL
echo [INFO] Warte auf PostgreSQL...
timeout /t 5 /nobreak >nul

REM Installiere Backend Dependencies
if not exist "backend\node_modules" (
    echo [INFO] Installiere Backend Dependencies...
    cd backend
    call npm install
    cd ..
    echo [OK] Backend Dependencies installiert
)

REM Prisma Setup
echo [INFO] Initialisiere Datenbank...
cd backend
call npx prisma generate >nul 2>nul
call npx prisma migrate deploy >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    call npx prisma migrate dev --name init >nul 2>nul
)
echo [OK] Datenbank migriert
cd ..

REM Erstelle Demo-User
echo [INFO] Erstelle Demo-Benutzer...
timeout /t 2 /nobreak >nul

curl -s -X POST http://localhost:3001/api/auth/register ^
    -H "Content-Type: application/json" ^
    -d "{\"email\":\"demo@changepilot.com\",\"password\":\"demo123\",\"firstName\":\"Demo\",\"lastName\":\"User\",\"role\":\"CONSULTANT\"}" >nul 2>nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║  ChangePilot läuft erfolgreich!                          ║
echo ║                                                           ║
echo ║  Frontend:  http://localhost:5173                        ║
echo ║  Backend:   http://localhost:3001                        ║
echo ║                                                           ║
echo ║  Login:                                                   ║
echo ║  Email:    demo@changepilot.com                          ║
echo ║  Password: demo123                                       ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo [INFO] Logs anzeigen: docker-compose logs -f
echo [INFO] Stoppen: docker-compose down
echo.

REM Öffne Browser
echo [INFO] Öffne Browser...
timeout /t 2 /nobreak >nul
start http://localhost:5173

pause
