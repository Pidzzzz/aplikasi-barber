#!/data/data/com.termux/files/usr/bin/bash

cd ~/barber-cashier

# Kill existing server if running
pkill -f "python -m http.server 8080" 2>/dev/null

echo "========================================="
echo "   IP MAN HAIRSTUDIO"
echo "========================================="
echo ""
echo " Starting server..."
echo " Open: http://localhost:8080"
echo ""
echo " Press CTRL+C to stop"
echo "========================================="
echo ""

python -m http.server 8080
