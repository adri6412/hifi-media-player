@echo off
REM Start HiFi Media Player in production mode

echo ==========================================
echo   HiFi Media Player - Production Mode
echo ==========================================
echo.

REM Check if build exists
if not exist "renderer-dist\index.html" (
    echo Build non trovato! Esegui prima la compilazione...
    echo.
    echo Esecuzione di npm run build...
    call npm run build
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Errore durante la compilazione!
        pause
        exit /b 1
    )
)

echo Avvio di HiFi Media Player...
echo.

call npm run electron

