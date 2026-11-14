$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'clipboard-collection.ps1')
$testRoot = Join-Path ([IO.Path]::GetTempPath()) ('chart-collection-test-' + [guid]::NewGuid())
[IO.Directory]::CreateDirectory($testRoot) | Out-Null
function Assert($Condition, [string]$Message) { if (!$Condition) { throw $Message } }
function Assert-Throws([scriptblock]$Action, [string]$Message) {
    $threw = $false
    try { & $Action | Out-Null } catch { $threw = $true }
    Assert $threw $Message
}
try {
    $session = New-ChartCollection (Join-Path $testRoot 'collection')
    $common = @{ Directory = $session.Directory; CollectionId = $session.CollectionId }
    $big = "NOTES first-record`r`n" + (("Synthetic $([char]0x03bc)`t42`r`n") * 100000) + 'last-record'
    $script:reads = 0
    $capture = Save-ChartClipboard -OutputPath (Join-Path $testRoot 'capture.txt') `
        -PreviousSha256 (Get-ChartTextHash 'previous') -SourceToken NOTES `
        -ExpectedTokens @('first-record','last-record') -TimeoutSeconds 10 -PollMilliseconds 10 `
        -ReadClipboard { $script:reads++; if ($script:reads -lt 4) { 'previous' } else { $big } }
    Assert $capture.Saved 'Delayed large copy did not save.'
    $a = Add-ChartCaptureToCollection @common -BatchName notes-01 -SourceLabel 'Notes interval A' -Capture $capture
    Assert ($a.Added -and $a.Count -eq 1) 'First batch missing.'
    $again = Add-ChartCaptureToCollection @common -BatchName notes-01 -SourceLabel 'Notes interval A' -Capture $capture
    Assert (!$again.Added -and $again.State -eq 'AlreadyCollected') 'Retry duplicated a batch.'
    # Identical text in a distinct source/batch must not be silently deduplicated.
    $b = Add-ChartCaptureToCollection @common -BatchName notes-02 -SourceLabel 'Notes interval B' -Capture $capture
    Assert ($b.Added -and $b.Count -eq 2) 'Distinct source with identical text was discarded.'
    Assert-Throws { Add-ChartCaptureToCollection -Directory $session.Directory -CollectionId wrong -BatchName wrong -SourceLabel Wrong -Capture $capture } 'Wrong session accepted.'
    Assert-Throws { Add-ChartCaptureToCollection @common -BatchName invalid -SourceLabel Invalid -Capture ([pscustomobject]@{ Saved = $false }) } 'Failed capture accepted.'
    Assert-Throws { Add-ChartCaptureToCollection @common -BatchName notes-01 -SourceLabel Changed -Capture $capture } 'Existing batch source was changed.'
    $script:syntheticClipboard = ''
    $output = Join-Path $testRoot 'combined.txt'
    $result = Complete-ChartCollection @common -OutputPath $output -CopyToClipboard `
        -WriteClipboard { param($Text) $script:syntheticClipboard = $Text } `
        -ReadClipboard { $script:syntheticClipboard }
    $saved = [IO.File]::ReadAllText($output)
    Assert ($result.Saved -and $result.Batches -eq 2 -and $result.ClipboardVerified) 'Combined output failed.'
    Assert ($saved.IndexOf('Notes interval A') -lt $saved.IndexOf('Notes interval B')) 'Ordering changed.'
    $first = $saved.IndexOf($big, [StringComparison]::Ordinal)
    $second = $saved.IndexOf($big, $first + $big.Length, [StringComparison]::Ordinal)
    Assert ($first -ge 0 -and $second -gt $first) 'Raw text, Unicode, or line endings changed.'
    Assert-Throws { Complete-ChartCollection @common -OutputPath $output } 'Existing output overwritten.'
    $failure = Complete-ChartCollection @common -OutputPath (Join-Path $testRoot 'clipboard-failed.txt') `
        -CopyToClipboard -WriteClipboard { throw 'Synthetic lock' }
    Assert ($failure.Saved -and !$failure.ClipboardVerified -and $failure.ClipboardWriteFailed) 'Clipboard failure hid saved output.'
    [IO.File]::WriteAllText((Join-Path $session.Directory 'orphan.txt'),'unfinished')
    Assert-Throws { Complete-ChartCollection @common -OutputPath (Join-Path $testRoot 'bad.txt') } 'Unregistered batch ignored.'
    Remove-Item -LiteralPath (Join-Path $session.Directory 'orphan.txt')
    [IO.File]::AppendAllText((Join-Path $session.Directory 'notes-01.txt'),'modified')
    Assert-Throws { Complete-ChartCollection @common -OutputPath (Join-Path $testRoot 'tampered.txt') } 'Changed raw evidence accepted.'
    Write-Output "PASS: delayed large capture, ordered accumulation, exact Unicode/newlines, retry deduplication, distinct-source retention, session isolation, failure handling, and no overwrite. Combined characters: $($result.Characters). Real clipboard untouched."
} finally {
    $resolved = [IO.Path]::GetFullPath($testRoot)
    $prefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
    if ($resolved.StartsWith($prefix,[StringComparison]::OrdinalIgnoreCase) -and
        [IO.Path]::GetFileName($resolved).StartsWith('chart-collection-test-')) {
        Remove-Item -LiteralPath $resolved -Recurse -Force
    }
}
