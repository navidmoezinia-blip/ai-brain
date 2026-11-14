$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'clipboard-capture.ps1')
$testRoot = Join-Path ([IO.Path]::GetTempPath()) ('chart-copy-test-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $testRoot | Out-Null
function Assert($Condition, [string]$Message) {
    if (-not $Condition) { throw $Message }
}
$old = "ECHO synthetic-first synthetic-last old report"
$fresh = "ECHO`r`nsynthetic-first`r`nsynthetic-last`r`nUTF-8 value: $([char]0x03bc)`t42`r`n"
$params = @{
    PreviousSha256 = Get-ChartTextHash $old
    SourceToken = 'ECHO'
    ExpectedTokens = @('synthetic-first', 'synthetic-last')
    TimeoutSeconds = 0.15
    PollMilliseconds = 10
}
try {
    # Stale text can match all tokens; the previous hash must still reject it.
    $result = Save-ChartClipboard @params -OutputPath (Join-Path $testRoot 'stale.txt') -ReadClipboard { $old }
    Assert (-not $result.Saved -and $result.Observations.Unchanged -gt 0) 'Stale text accepted.'
    Assert (-not (Test-Path $result.Path)) 'Failure created a raw file.'

    foreach ($scenario in @('empty', 'locked', 'wrong-source', 'missing-endpoint', 'changing')) {
        $script:readNumber = 0
        $reader = {
            $script:readNumber++
            switch ($scenario) {
                'empty' { return '' }
                'locked' { throw 'Synthetic clipboard lock' }
                'wrong-source' { return 'LAB synthetic-first synthetic-last' }
                'missing-endpoint' { return 'ECHO synthetic-first only' }
                'changing' { return ($fresh + $script:readNumber) }
            }
        }
        $result = Save-ChartClipboard @params -OutputPath (Join-Path $testRoot "$scenario.txt") -ReadClipboard $reader
        Assert (-not $result.Saved) "$scenario text accepted."
        Assert (-not (Test-Path $result.Path)) "$scenario failure created a raw file."
    }

    # Recover from access/empty/stale/wrong-source states, then require two
    # consecutive identical valid reads. The actual OS clipboard is never used.
    $script:readNumber = 0
    $reader = {
        $script:readNumber++
        switch ($script:readNumber) {
            1 { throw 'Synthetic lock' }
            2 { return '' }
            3 { return $old }
            4 { return 'LAB synthetic-first synthetic-last' }
            default { return $fresh }
        }
    }
    $successParams = $params.Clone(); $successParams.TimeoutSeconds = 2
    $result = Save-ChartClipboard @successParams -OutputPath (Join-Path $testRoot 'fresh.txt') -ReadClipboard $reader
    Assert $result.Saved 'Fresh stable text was not saved.'
    Assert ([IO.File]::ReadAllText($result.Path) -ceq $fresh) 'Newlines, Unicode, or text changed.'
    Assert ($script:readNumber -eq 6) 'Stable-read gate did not require two valid reads.'
    foreach ($state in @('AccessError', 'Empty', 'Unchanged', 'Mismatch')) {
        Assert ($result.Observations.$state -eq 1) "Incorrect $state recovery count."
    }
    $threw = $false
    try { Save-ChartClipboard @params -OutputPath $result.Path -ReadClipboard { $fresh } | Out-Null }
    catch { $threw = $true }
    Assert $threw 'Existing file was not protected.'
    Assert ([IO.File]::ReadAllText($result.Path) -ceq $fresh) 'Existing file was changed.'
    Write-Output 'PASS: stale, empty, locked, mismatched, incomplete, changing, recovered, UTF-8, and no-overwrite cases.'
} finally {
    # Only remove the exact temporary directory created above.
    $resolved = [IO.Path]::GetFullPath($testRoot)
    $tempPrefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
    if ($resolved.StartsWith($tempPrefix, [StringComparison]::OrdinalIgnoreCase) -and
        [IO.Path]::GetFileName($resolved).StartsWith('chart-copy-test-')) {
        Remove-Item -LiteralPath $resolved -Recurse -Force
    }
}
