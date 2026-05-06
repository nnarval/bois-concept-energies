$ErrorActionPreference = 'Stop'

$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 5177
$Url = "http://127.0.0.1:$Port/ui_kits/website/index.html"
$Chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$PowerShell = "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe"
$ServerScript = Join-Path $ProjectDir 'serve-static.ps1'

if (-not (Test-Path -LiteralPath $Chrome)) {
  throw "Google Chrome est introuvable ici: $Chrome"
}

$ServerRunning = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($ServerRunning) {
  $ChromeProcess = New-Object System.Diagnostics.ProcessStartInfo
  $ChromeProcess.FileName = $Chrome
  $ChromeProcess.Arguments = $Url
  $ChromeProcess.UseShellExecute = $true
  [System.Diagnostics.Process]::Start($ChromeProcess) | Out-Null
  Write-Host "Site ouvert dans Google Chrome: $Url"
  exit 0
}

Write-Host "Ouverture du site dans Google Chrome: $Url"
Write-Host "Gardez cette fenetre ouverte pendant la consultation du site."
& $PowerShell -NoProfile -ExecutionPolicy Bypass -File $ServerScript -Port $Port -OpenUrl $Url -Chrome $Chrome
