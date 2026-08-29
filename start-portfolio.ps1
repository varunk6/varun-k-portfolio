# Varun K Portfolio PowerShell Launcher
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

if (-not (Test-Path "package.json")) {
    if (Test-Path "varun-portfolio\package.json") {
        Set-Location "$ScriptDir\varun-portfolio"
    } else {
        Write-Host "`n==========================================" -ForegroundColor Red
        Write-Host "ERROR: package.json was not found." -ForegroundColor Red
        Write-Host "Please run this script from the portfolio project folder." -ForegroundColor Red
        Write-Host "==========================================`n" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Clear-Host
Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "       VARUN K PORTFOLIO LAUNCHER" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check Node.js
try {
    $nodeVer = node --version
    $npmVer = npm --version
    Write-Host "[OK] Node.js $nodeVer found." -ForegroundColor Green
    Write-Host "[OK] npm $npmVer found." -ForegroundColor Green
} catch {
    Write-Host "`nNode.js is not installed or not available in PATH." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org and restart.`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "`n[!] node_modules folder is missing." -ForegroundColor Yellow
    Write-Host "Installing portfolio dependencies... Please wait...`n" -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nERROR: npm install failed." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[OK] Dependencies installed successfully." -ForegroundColor Green
} else {
    Write-Host "[OK] Dependencies verified." -ForegroundColor Green
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Starting development server..." -ForegroundColor Green
Write-Host "`nPortfolio URL:" -ForegroundColor Yellow
Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host "`nKeep this window open while using the portfolio." -ForegroundColor Gray
Write-Host "==========================================`n" -ForegroundColor Cyan

# Open browser after 3s
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:5173"
} | Out-Null

npm run dev
