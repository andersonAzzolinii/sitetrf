@echo off
REM Serve o espelho offline em http://localhost:8080
REM Use isto em vez de abrir o index.html direto: algumas imagens de /industries/
REM e os favicons usam caminho absoluto (/assets/...), que so resolve via HTTP.
cd /d "%~dp000-site-offline"
echo.
echo   Espelho TRF em  http://localhost:8080/
echo   Ctrl+C para parar.
echo.
start "" http://localhost:8080/
python -m http.server 8080
