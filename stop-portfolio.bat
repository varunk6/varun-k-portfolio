@echo off
setlocal enabledelayedexpansion
title Stop Varun K Portfolio Server

cd /d "%~dp0"

echo.
echo ==========================================
echo      STOPPING VARUN K PORTFOLIO SERVER
echo ==========================================
echo.

set "FOUND=0"

for /f "tokens=5" %%a in ('netstat -aon ^| findstr LISTENING ^| findstr :5173') do (
    set "PID=%%a"
    if defined PID (
        echo Stopping server process PID: !PID! listening on port 5173...
        taskkill /F /PID !PID! >nul 2>&1
        if !errorlevel! equ 0 (
            echo [OK] Portfolio server stopped successfully.
            set "FOUND=1"
        )
    )
)

if "!FOUND!"=="0" (
    echo [i] No active server process was found running on port 5173.
    echo The portfolio server is already stopped or running on a different port.
)

echo.
echo ==========================================
pause
