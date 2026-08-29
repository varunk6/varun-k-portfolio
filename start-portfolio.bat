@echo off
setlocal enabledelayedexpansion
title Varun K Portfolio Launcher

:: Navigate to script directory
cd /d "%~dp0"

:: Check if package.json is in current folder or varun-portfolio subfolder
if exist "package.json" (
    set "PROJECT_DIR=%~dp0"
) else if exist "varun-portfolio\package.json" (
    cd /d "%~dp0varun-portfolio"
    set "PROJECT_DIR=%~dp0varun-portfolio"
) else (
    echo.
    echo ==========================================
    echo ERROR: package.json was not found.
    echo Please run this launcher from the portfolio project folder.
    echo ==========================================
    echo.
    pause
    exit /b 1
)

cls
echo.
echo ==========================================
echo        VARUN K PORTFOLIO LAUNCHER
echo ==========================================
echo.
echo Checking Node.js environment...

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo Node.js is not installed or not available in PATH.
    echo Please install Node.js from https://nodejs.org and restart the launcher.
    echo.
    pause
    exit /b 1
)

:: Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo npm is not installed or not available in PATH.
    echo Please install Node.js/npm and restart the launcher.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('npm --version') do set NPM_VER=%%v
echo [OK] Node.js !NODE_VER! found.
echo [OK] npm !NPM_VER! found.

echo.
echo Checking project dependencies...
if not exist "node_modules" (
    echo.
    echo [!] node_modules folder is missing.
    echo Installing portfolio dependencies... Please wait...
    echo.
    call npm install
    if !errorlevel! neq 0 (
        echo.
        echo ERROR: npm install failed. Please check your internet connection or logs.
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully.
) else (
    echo [OK] Dependencies verified.
)

echo.
echo ==========================================
echo Starting development server...
echo.
echo Portfolio URL:
echo http://localhost:5173
echo.
echo Keep this window open while using the portfolio.
echo ==========================================
echo.

:: Launch browser automatically after server initializes
start "" /B cmd /c "ping 127.0.0.1 -n 4 >nul && start "" "http://localhost:5173""

:: Start Vite dev server
call npm run dev

pause
