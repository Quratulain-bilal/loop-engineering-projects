# Single-shot status check. The in-session loop runs this once per tick.
# Exits 0 with DONE when the marker exists, otherwise reports the latest progress line.
$done = Join-Path $PSScriptRoot 'output\result.json'
$progress = Join-Path $PSScriptRoot 'output\progress.log'

if (Test-Path $done) {
    $result = Get-Content $done -Raw
    Write-Output "STATUS: DONE"
    Write-Output $result
} else {
    $last = if (Test-Path $progress) { Get-Content $progress -Tail 1 } else { 'no progress file yet' }
    Write-Output "STATUS: RUNNING"
    Write-Output "last: $last"
}
