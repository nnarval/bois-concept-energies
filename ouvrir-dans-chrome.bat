@echo off
setlocal

set "SITE_FILE=%~dp0ui_kits\website\site-local.html"
set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"

if not exist "%SITE_FILE%" (
  echo Le fichier du site est introuvable:
  echo %SITE_FILE%
  echo.
  pause
  exit /b 1
)

if exist "%CHROME_EXE%" (
  start "" "%CHROME_EXE%" "%SITE_FILE%"
) else (
  start "" "%SITE_FILE%"
)

exit /b 0
