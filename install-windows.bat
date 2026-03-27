@echo off
REM HiFi Media Player - Installation script for Windows
REM Optimized for 1024x600 touchscreen displays

echo ==========================================
echo   HiFi Media Player - Windows Installer
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js non trovato!
    echo.
    echo Scarica e installa Node.js da: https://nodejs.org/
    echo Versione raccomandata: 18.x LTS o superiore
    echo.
    pause
    exit /b 1
)

echo Node.js trovato: 
node --version
echo npm versione:
npm --version
echo.

REM Install project dependencies
echo Installazione dipendenze npm...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Errore durante l'installazione delle dipendenze!
    pause
    exit /b 1
)

REM Build the application
echo.
echo Compilazione dell'applicazione...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Errore durante la compilazione!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installazione completata con successo!
echo ========================================
echo.
echo Per avviare l'applicazione:
echo   Modalita sviluppo: npm run electron:dev
echo   Modalita produzione: npm run electron
echo.
echo Oppure usa i file batch:
echo   start-dev.bat    - Avvia in modalita sviluppo
echo   start-prod.bat   - Avvia in modalita produzione
echo.
pause

