#!/data/data/com.termux/files/usr/bin/bash

pkill -f "python -m http.server 8080" 2>/dev/null

echo "========================================="
echo " Server stopped!"
echo "========================================="
