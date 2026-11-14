# Explicit, per-patient accumulation of already verified captures. No watcher.
. (Join-Path $PSScriptRoot 'clipboard-capture.ps1')

function New-ChartCollection {
    param([Parameter(Mandatory)][string]$Directory)
    $root = [IO.Path]::GetFullPath($Directory)
    if (Test-Path -LiteralPath $root) { throw 'Choose a new collection directory.' }
    [IO.Directory]::CreateDirectory($root) | Out-Null
    $id = [guid]::NewGuid().ToString()
    [IO.File]::WriteAllText((Join-Path $root 'collection.json'),
        (@{ Version = 1; Id = $id } | ConvertTo-Json), [Text.UTF8Encoding]::new($false))
    [pscustomobject]@{ Directory = $root; CollectionId = $id }
}

function Confirm-ChartCollection {
    param([string]$Directory, [string]$CollectionId)
    $root = [IO.Path]::GetFullPath($Directory)
    $manifest = Get-Content -LiteralPath (Join-Path $root 'collection.json') -Raw | ConvertFrom-Json
    if ($manifest.Version -ne 1 -or $manifest.Id -cne $CollectionId) {
        throw 'Collection identity mismatch; do not mix patients or sessions.'
    }
    $root
}

function Add-ChartCaptureToCollection {
    param(
        [Parameter(Mandatory)][string]$Directory,
        [Parameter(Mandatory)][string]$CollectionId,
        [Parameter(Mandatory)][ValidatePattern('^[a-zA-Z0-9_-]{1,80}$')][string]$BatchName,
        [Parameter(Mandatory)][ValidateNotNullOrEmpty()][string]$SourceLabel,
        [Parameter(Mandatory)][psobject]$Capture
    )
    $root = Confirm-ChartCollection $Directory $CollectionId
    if ($Capture.Saved -ne $true -or !$Capture.Path -or !$Capture.Sha256) {
        throw 'Only a successful Save-ChartClipboard result can be collected.'
    }
    $raw = [IO.File]::ReadAllText([IO.Path]::GetFullPath($Capture.Path))
    if ((Get-ChartTextHash $raw) -cne $Capture.Sha256) { throw 'Capture changed after verification.' }
    $recordPath = Join-Path $root "$BatchName.json"
    if ($BatchName -eq 'collection') { throw 'Reserved batch name.' }
    if (Test-Path -LiteralPath $recordPath) {
        $existing = Get-Content -LiteralPath $recordPath -Raw | ConvertFrom-Json
        if ($existing.Sha256 -cne $Capture.Sha256 -or $existing.SourceLabel -cne $SourceLabel) {
            throw 'Batch name already belongs to different content or a different source.'
        }
        $saved = [IO.File]::ReadAllText((Join-Path $root "$BatchName.txt"))
        if ((Get-ChartTextHash $saved) -cne $Capture.Sha256) { throw 'Stored batch changed.' }
        return [pscustomobject]@{ Added = $false; State = 'AlreadyCollected'; Batch = $BatchName }
    }
    # CreateNew prevents overwriting a prior/orphaned batch. A failed operation
    # leaves raw evidence available; never count it without its committed record.
    $rawPath = Join-Path $root "$BatchName.txt"
    $bytes = [Text.UTF8Encoding]::new($false).GetBytes($raw)
    $stream = [IO.File]::Open($rawPath, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write)
    try { $stream.Write($bytes, 0, $bytes.Length) } finally { $stream.Dispose() }
    if ([IO.File]::ReadAllText($rawPath) -cne $raw) { throw 'Collection read-back mismatch.' }
    $records = @(Get-ChildItem -LiteralPath $root -Filter '*.json' -File | Where-Object Name -ne 'collection.json')
    $record = [ordered]@{
        CollectionId = $CollectionId; Sequence = $records.Count + 1; Batch = $BatchName
        SourceLabel = $SourceLabel; Sha256 = $Capture.Sha256; CapturedUtc = $Capture.CapturedUtc
        Characters = $raw.Length
    }
    $json = [Text.UTF8Encoding]::new($false).GetBytes(($record | ConvertTo-Json))
    $stream = [IO.File]::Open($recordPath, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write)
    try { $stream.Write($json, 0, $json.Length) } finally { $stream.Dispose() }
    [pscustomobject]@{ Added = $true; State = 'Collected'; Batch = $BatchName; Count = $records.Count + 1; Characters = $raw.Length }
}

function Complete-ChartCollection {
    param(
        [Parameter(Mandatory)][string]$Directory,
        [Parameter(Mandatory)][string]$CollectionId,
        [Parameter(Mandatory)][string]$OutputPath,
        [switch]$CopyToClipboard,
        [scriptblock]$WriteClipboard = { param($Text) Set-Clipboard -Value $Text -ErrorAction Stop },
        [scriptblock]$ReadClipboard = { Get-Clipboard -Raw -ErrorAction Stop }
    )
    $root = Confirm-ChartCollection $Directory $CollectionId
    $records = @(Get-ChildItem -LiteralPath $root -Filter '*.json' -File |
        Where-Object Name -ne 'collection.json' |
        ForEach-Object { Get-Content -LiteralPath $_.FullName -Raw | ConvertFrom-Json } |
        Sort-Object Sequence)
    if (!$records.Count) { throw 'Collection has no verified batches.' }
    if (@(Get-ChildItem -LiteralPath $root -Filter '*.txt' -File).Count -ne $records.Count) {
        throw 'Unregistered raw batch found; reconcile the incomplete capture before exporting.'
    }
    $text = [Text.StringBuilder]::new()
    $sequence = 0
    foreach ($record in $records) {
        $sequence++
        if ($record.CollectionId -cne $CollectionId -or $record.Sequence -ne $sequence -or
            $record.Batch -notmatch '^[a-zA-Z0-9_-]{1,80}$') { throw 'Invalid collection record or ordering.' }
        $raw = [IO.File]::ReadAllText((Join-Path $root "$($record.Batch).txt"))
        if ((Get-ChartTextHash $raw) -cne $record.Sha256) { throw 'Stored batch changed; combined export stopped.' }
        [void]$text.Append("### $($record.SourceLabel)`r`nBatch: $($record.Batch) | Captured UTC: $($record.CapturedUtc)`r`n`r`n")
        [void]$text.Append($raw)
        [void]$text.Append("`r`n`r`n")
    }
    $output = [IO.Path]::GetFullPath($OutputPath)
    if ($output.StartsWith($root.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar,
        [StringComparison]::OrdinalIgnoreCase)) { throw 'Save the combined export outside the collection directory.' }
    $value = $text.ToString()
    $bytes = [Text.UTF8Encoding]::new($false).GetBytes($value)
    $stream = [IO.File]::Open($output, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write)
    try { $stream.Write($bytes, 0, $bytes.Length) } finally { $stream.Dispose() }
    if ([IO.File]::ReadAllText($output) -cne $value) { throw 'Combined export read-back mismatch.' }
    $copied = $false
    $clipboardError = $false
    if ($CopyToClipboard) {
        try { & $WriteClipboard $value } catch { $clipboardError = $true }
        $timer = [Diagnostics.Stopwatch]::StartNew()
        while (!$clipboardError -and !$copied -and $timer.Elapsed.TotalSeconds -lt 10) {
            try { $copied = ([string](& $ReadClipboard) -ceq $value) } catch { $copied = $false }
            if (!$copied) { Start-Sleep -Milliseconds 250 }
        }
    }
    [pscustomobject]@{
        Saved = $true; Path = $output; Batches = $records.Count; Characters = $value.Length
        ClipboardRequested = [bool]$CopyToClipboard; ClipboardVerified = $copied
        ClipboardWriteFailed = $clipboardError
    }
}
