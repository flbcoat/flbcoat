@echo off
REM ChangePilot - Stop Script für Windows

echo.
echo Stoppe ChangePilot...
echo.

docker-compose down

echo.
echo [OK] ChangePilot wurde gestoppt
echo.

pause
