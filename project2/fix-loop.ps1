# Loop driver for the maker-checker cycle.
#
#   .\fix-loop.ps1          -> consume one attempt, run the checker, print the verdict
#   .\fix-loop.ps1 -Reset   -> clear the attempt counter and start over
#
# The attempt count lives in a file, not in the agent's head, so the cap is
# enforced even if the agent forgets or the session restarts.
param(
    [switch]$Reset,
    [int]$MaxAttempts = 6
)

$counter = Join-Path $PSScriptRoot '.attempts'

if ($Reset) {
    Set-Content $counter '0' -Encoding utf8
    Write-Output "counter reset to 0"
    exit 0
}

$attempt = 0
if (Test-Path $counter) { $attempt = [int](Get-Content $counter -Raw).Trim() }
$attempt++
Set-Content $counter "$attempt" -Encoding utf8

Write-Output "===== attempt $attempt of $MaxAttempts ====="

& (Join-Path $PSScriptRoot 'run-tests.ps1')
$passed = ($LASTEXITCODE -eq 0)

if ($passed) {
    Write-Output "LOOP: STOP - tests passed on attempt $attempt"
    exit 0
}
if ($attempt -ge $MaxAttempts) {
    Write-Output "LOOP: STOP - hit the cap of $MaxAttempts attempts without passing"
    exit 2
}
Write-Output "LOOP: CONTINUE - $($MaxAttempts - $attempt) attempts left"
exit 1
