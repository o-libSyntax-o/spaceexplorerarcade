@echo OFF
echo "Starting Python server -- Opening in browser"

start "" http://127.0.0.1:8000

python -m http.server

pause
echo "No Longer running close this window"