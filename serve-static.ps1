param(
  [int]$Port = 5177,
  [string]$OpenUrl = '',
  [string]$Chrome = ''
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path -LiteralPath $PSScriptRoot).Path
$HostAddress = [System.Net.IPAddress]::Parse('127.0.0.1')
$Listener = [System.Net.Sockets.TcpListener]::new($HostAddress, $Port)

$Types = @{
  '.css' = 'text/css; charset=utf-8'
  '.html' = 'text/html; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'
  '.jsx' = 'text/babel; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.png' = 'image/png'
  '.svg' = 'image/svg+xml; charset=utf-8'
  '.webp' = 'image/webp'
}

function Get-SafePath {
  param([string]$UrlPath)

  $CleanPath = [System.Uri]::UnescapeDataString(($UrlPath -split '\?')[0])
  if ([string]::IsNullOrWhiteSpace($CleanPath) -or $CleanPath -eq '/') {
    $CleanPath = '/ui_kits/website/index.html'
  }

  $RelativePath = $CleanPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
  $FullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $RelativePath))

  if ($FullPath -ne $Root -and -not $FullPath.StartsWith($Root + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $null
  }

  if ((Test-Path -LiteralPath $FullPath -PathType Container)) {
    $FullPath = [System.IO.Path]::Combine($FullPath, 'index.html')
  }

  return $FullPath
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$Status,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType
  )

  $Header = "HTTP/1.1 $Status $StatusText`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
  $HeaderBytes = [System.Text.Encoding]::ASCII.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  $Stream.Write($Body, 0, $Body.Length)
}

$Listener.Start()
Write-Host "Foyer & Flamme is available at http://127.0.0.1:$Port/ui_kits/website/index.html"

if ($OpenUrl -and $Chrome) {
  $ChromeProcess = New-Object System.Diagnostics.ProcessStartInfo
  $ChromeProcess.FileName = $Chrome
  $ChromeProcess.Arguments = $OpenUrl
  $ChromeProcess.UseShellExecute = $true
  [System.Diagnostics.Process]::Start($ChromeProcess) | Out-Null
}

try {
  while ($true) {
    $Client = $Listener.AcceptTcpClient()
    try {
      $Stream = $Client.GetStream()
      $Reader = [System.IO.StreamReader]::new($Stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $RequestLine = $Reader.ReadLine()

      while ($Reader.ReadLine()) {}

      if (-not $RequestLine) {
        continue
      }

      $Parts = $RequestLine.Split(' ')
      $FilePath = Get-SafePath -UrlPath $Parts[1]

      if (-not $FilePath) {
        $Body = [System.Text.Encoding]::UTF8.GetBytes('Forbidden')
        Send-Response -Stream $Stream -Status 403 -StatusText 'Forbidden' -Body $Body -ContentType 'text/plain; charset=utf-8'
        continue
      }

      if (-not (Test-Path -LiteralPath $FilePath -PathType Leaf)) {
        $Body = [System.Text.Encoding]::UTF8.GetBytes('Not found')
        Send-Response -Stream $Stream -Status 404 -StatusText 'Not Found' -Body $Body -ContentType 'text/plain; charset=utf-8'
        continue
      }

      $Ext = [System.IO.Path]::GetExtension($FilePath).ToLowerInvariant()
      $ContentType = if ($Types.ContainsKey($Ext)) { $Types[$Ext] } else { 'application/octet-stream' }
      $Body = [System.IO.File]::ReadAllBytes($FilePath)
      Send-Response -Stream $Stream -Status 200 -StatusText 'OK' -Body $Body -ContentType $ContentType
    } finally {
      $Client.Close()
    }
  }
} finally {
  $Listener.Stop()
}
