@echo off
setlocal

set "URL=http://127.0.0.1:5177/ui_kits/website/index.html"
set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"

timeout /t 2 /nobreak >nul

if exist "%CHROME_EXE%" (
  start "" "%CHROME_EXE%" "%URL%"
) else (
  start "" "%URL%"
)
