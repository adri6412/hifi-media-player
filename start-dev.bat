@echo off
REM Start HiFi Media Player in development mode

echo ==========================================
echo   HiFi Media Player - Development Mode
echo ==========================================
echo.
echo Avvio del server di sviluppo e Electron...
echo Premi Ctrl+C per fermare l'applicazione
echo.

call npm run electron:dev

