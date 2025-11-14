#!/bin/bash

# ChangePilot - Stop Script

echo ""
echo "🛑 Stoppe ChangePilot..."
echo ""

# Stoppe Docker Container
if command -v docker &> /dev/null; then
    docker-compose down
    echo ""
    echo "✓ ChangePilot wurde gestoppt"
else
    echo "⚠ Docker nicht gefunden. Bitte stoppe die Services manuell."
fi

echo ""
