# Stops the clipboard watcher. Run only after raw.txt has been copied into the patient's
# output folder and read back; then the temp captures are deleted.
# Usage: finish.ps1 [-Dir ...]
param([string]$Dir = "$env:TEMP\chart-check")
New-Item (Join-Path $Dir 'stop.flag') -ItemType File -Force | Out-Null
Start-Sleep -Milliseconds 800
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'clipwatch\.ps1' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
Remove-Item (Join-Path $Dir '*') -Force -ErrorAction SilentlyContinue
'Watcher stopped, temp captures deleted'
