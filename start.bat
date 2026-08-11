@echo off
title Maddix Tools Server
cd /d "%~dp0"
echo Starting Maddix Tools at http://localhost:3000 ...
echo Press Ctrl+C to stop.
echo.
python server.py
pause
