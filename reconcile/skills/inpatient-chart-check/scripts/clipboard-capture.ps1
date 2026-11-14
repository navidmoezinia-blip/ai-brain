# Dot-source this file; no UI actions or clipboard mutations are performed.
function Get-ChartTextHash {
    param([AllowEmptyString()][string]$Text)
    $sha = [Security.Cryptography.SHA256]::Create()
    try {
        return ([BitConverter]::ToString($sha.ComputeHash(
            [Text.Encoding]::UTF8.GetBytes($Text)))).Replace('-', '').ToLowerInvariant()
    } finally { $sha.Dispose() }
}

function Get-ChartClipboardHash {
    param([scriptblock]$ReadClipboard = { Get-Clipboard -Raw -ErrorAction Stop })
    Get-ChartTextHash -Text ([string](& $ReadClipboard))
}

function Save-ChartClipboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$OutputPath,
        [Parameter(Mandatory)][ValidatePattern('^[a-fA-F0-9]{64}$')][string]$PreviousSha256,
        [Parameter(Mandatory)][ValidateNotNullOrEmpty()][string]$SourceToken,
        [Parameter(Mandatory)][ValidateCount(2, 32)][string[]]$ExpectedTokens,
        [ValidateRange(0.05, 60)][double]$TimeoutSeconds = 45,
        [ValidateRange(10, 5000)][int]$PollMilliseconds = 500,
        # Injection is for synthetic tests; production uses the default reader.
        [scriptblock]$ReadClipboard = { Get-Clipboard -Raw -ErrorAction Stop }
    )
    $tokens = @($SourceToken) + @($ExpectedTokens)
    if (@($tokens | Where-Object { [string]::IsNullOrWhiteSpace($_) }).Count) {
        throw 'Source and endpoint tokens must be nonempty.'
    }
    if (@($ExpectedTokens | Select-Object -Unique).Count -lt 2) {
        throw 'Provide two distinct endpoint identity tokens.'
    }
    $path = [IO.Path]::GetFullPath($OutputPath)
    if (Test-Path -LiteralPath $path) { throw 'Output already exists; choose a unique batch filename.' }
    if (-not (Test-Path -LiteralPath ([IO.Path]::GetDirectoryName($path)) -PathType Container)) {
        throw 'Create the intended patient output folder before capture.'
    }
    $counts = [ordered]@{ Empty = 0; AccessError = 0; Unchanged = 0; Mismatch = 0; Unstable = 0 }
    $timer = [Diagnostics.Stopwatch]::StartNew()
    $lastHash = $null
    $state = 'NoRead'
    do {
        try { $value = [string](& $ReadClipboard) }
        catch {
            # Avoid exposing clipboard text or exception details in logs.
            $counts.AccessError++; $state = 'AccessError'; $lastHash = $null
            $value = $null
        }
        if ($null -ne $value) {
            if ([string]::IsNullOrWhiteSpace($value)) {
                $counts.Empty++; $state = 'Empty'; $lastHash = $null
            } else {
                $hash = Get-ChartTextHash -Text $value
                $missing = @($tokens | Where-Object {
                    $value.IndexOf($_, [StringComparison]::Ordinal) -lt 0
                })
                if ($hash -eq $PreviousSha256) {
                    $counts.Unchanged++; $state = 'Unchanged'; $lastHash = $null
                } elseif ($missing.Count) {
                    $counts.Mismatch++; $state = 'Mismatch'; $lastHash = $null
                } elseif ($hash -eq $lastHash) {
                    # CreateNew prevents overwriting a file created during polling.
                    $bytes = [Text.UTF8Encoding]::new($false).GetBytes($value)
                    $stream = [IO.File]::Open($path, [IO.FileMode]::CreateNew,
                        [IO.FileAccess]::Write, [IO.FileShare]::None)
                    try { $stream.Write($bytes, 0, $bytes.Length) }
                    finally { $stream.Dispose() }
                    if ([IO.File]::ReadAllText($path) -cne $value) {
                        throw 'Read-back mismatch; output is unverified. Do not mark the batch saved.'
                    }
                    return [pscustomobject]@{
                        Saved = $true; State = 'Saved'; Path = $path
                        Characters = $value.Length; Sha256 = $hash
                        CapturedUtc = [DateTime]::UtcNow.ToString('o')
                        ElapsedMilliseconds = $timer.ElapsedMilliseconds
                        Observations = [pscustomobject]$counts
                    }
                } else {
                    $counts.Unstable++; $state = 'AwaitingStableRead'; $lastHash = $hash
                }
            }
        }
        if ($timer.Elapsed.TotalSeconds -lt $TimeoutSeconds) {
            Start-Sleep -Milliseconds $PollMilliseconds
        }
    } while ($timer.Elapsed.TotalSeconds -lt $TimeoutSeconds)
    [pscustomobject]@{
        Saved = $false; State = $state; Path = $path
        ElapsedMilliseconds = $timer.ElapsedMilliseconds
        Observations = [pscustomobject]$counts
    }
}
