#!/data/data/com.termux/files/usr/bin/bash

BACKUP_DIR=~/barber-cashier-backups
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.json"

mkdir -p "$BACKUP_DIR"

echo "========================================="
echo " IP MAN HAIRSTUDIO - Backup"
echo "========================================="
echo ""

# Check if server is running
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "Server is running. Use the app to backup:"
    echo " Open: http://localhost:8080"
    echo " Sidebar > Backup"
    echo ""
    echo "Or copy manually from:"
    echo " /sdcard/Download/"
else
    echo "Server is not running."
    echo ""
    echo "To backup data:"
    echo "1. Start server: start-barber"
    echo "2. Open http://localhost:8080"
    echo "3. Open sidebar > Backup"
fi

echo ""
echo "Recent backups:"
ls -la "$BACKUP_DIR"/*.json 2>/dev/null || echo " No backups yet"
echo ""
