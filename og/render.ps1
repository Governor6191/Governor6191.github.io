# og/render.ps1
# Render og-image.png from og-card.html using headless Chrome (or Edge).
#
# Usage (from any folder):
#   .\og\render.ps1                                        # from project root
#   & "C:\path\to\og\render.ps1"                           # absolute
#
# What it does:
#   - Finds Chrome or Edge in standard Windows install locations.
#   - Renders og-card.html at 1200x720 with a 5-second virtual-time
#     budget so Google Fonts have time to load before the snapshot.
#   - Overwrites og-image.png in place.
#
# When to re-run:
#   - Any time you edit og-card.html (eyebrow, tagline, h1, etc.).
#   - After the render, git diff og/og-image.png to confirm the PNG
#     changed, then commit and push.

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$cardPath  = Join-Path $scriptDir 'og-card.html'
$outPath   = Join-Path $scriptDir 'og-image.png'

if (-not (Test-Path $cardPath)) {
    throw "og-card.html not found at $cardPath"
}

# Find a Chromium browser
$candidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) {
    throw "Neither Chrome nor Edge found in standard install locations. Install one, or edit this script with the full path to chrome.exe / msedge.exe."
}

# file:// URL with forward slashes
$cardUrl = 'file:///' + ($cardPath -replace '\\', '/')

Write-Host "Browser: $browser"
Write-Host "Source:  $cardPath"
Write-Host "Output:  $outPath"
Write-Host ""

& $browser `
    --headless=new `
    --disable-gpu `
    --hide-scrollbars `
    --window-size=1200,720 `
    --virtual-time-budget=5000 `
    "--screenshot=$outPath" `
    $cardUrl

if (-not (Test-Path $outPath)) {
    throw "Render failed: $outPath was not produced."
}

$bytes = (Get-Item $outPath).Length
$kb = [math]::Round($bytes / 1KB, 1)
Write-Host ""
Write-Host "Rendered og-image.png ($kb KB)."
Write-Host "Preview with:  ii $outPath"
