@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "PORT=5177"
set "NODE_EXE=C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%PROJECT_DIR%ui_kits\website\index.html" (
  echo Le site est introuvable dans:
  echo %PROJECT_DIR%ui_kits\website\index.html
  echo.
  pause
  exit /b 1
)

if not exist "%PROJECT_DIR%serve-static.mjs" (
  echo Le serveur local est introuvable dans:
  echo %PROJECT_DIR%serve-static.mjs
  echo.
  pause
  exit /b 1
)

if not exist "%NODE_EXE%" (
  set "NODE_EXE="
  for %%P in (node.exe node) do (
    where %%P >nul 2>nul
    if not errorlevel 1 if not defined NODE_EXE set "NODE_EXE=%%P"
  )
)

if not defined NODE_EXE (
  echo Node.js est introuvable.
  echo.
  pause
  exit /b 1
)

echo Serveur local du site Foyer et Flamme
echo Adresse: http://127.0.0.1:%PORT%/ui_kits/website/index.html
echo.
echo Gardez cette fenetre ouverte pendant la consultation du site.
echo Fermez cette fenetre pour arreter le serveur.
echo.

if /I "%~1"=="--open" (
  start "" "%PROJECT_DIR%ouvrir-chrome-apres-demarrage.bat"
)

"%NODE_EXE%" "%PROJECT_DIR%serve-static.mjs"
echo.
echo Le serveur s'est arrete.
pause
