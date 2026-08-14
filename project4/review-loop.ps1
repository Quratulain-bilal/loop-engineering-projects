# Maker-checker loop. The reviewer's verdict — not the implementer, not this
# script — decides whether a PR may open.
#
#   .\review-loop.ps1 -Reset
#   .\review-loop.ps1 -Branch fix/x -Verdict FAIL   -> records it, says CONTINUE
#   .\review-loop.ps1 -Branch fix/y -Verdict PASS   -> says OPEN PR
#   .\review-loop.ps1 -OpenPr                       -> refuses unless last verdict was PASS
#
# Attempts live in a file so the cap survives the agent forgetting.
param(
    [switch]$Reset,
    [switch]$OpenPr,
    [string]$Branch,
    [ValidateSet('PASS', 'FAIL')][string]$Verdict,
    [int]$MaxAttempts = 4
)

$state = Join-Path $PSScriptRoot '.review-state.json'

if ($Reset) {
    '{"attempts":0,"last":null,"branch":null}' | Set-Content $state -Encoding utf8
    Write-Output "loop state reset"
    exit 0
}

if (-not (Test-Path $state)) {
    Write-Output "no state - run with -Reset first"
    exit 3
}
$s = Get-Content $state -Raw | ConvertFrom-Json

# --- gate: may we open the PR? ---
if ($OpenPr) {
    if ($s.last -ne 'PASS') {
        Write-Output "GATE: BLOCKED - last verdict was '$($s.last)', a PR needs PASS"
        exit 1
    }
    Write-Output "GATE: OPEN - branch $($s.branch) passed review, PR may be opened"
    exit 0
}

# --- record one attempt ---
if (-not $Branch -or -not $Verdict) {
    Write-Output "usage: -Branch <name> -Verdict PASS|FAIL"
    exit 3
}

$attempt = [int]$s.attempts + 1
@{ attempts = $attempt; last = $Verdict; branch = $Branch } |
    ConvertTo-Json | Set-Content $state -Encoding utf8

Write-Output "===== attempt $attempt of $MaxAttempts - branch $Branch ====="
Write-Output "reviewer said: $Verdict"

if ($Verdict -eq 'PASS') {
    Write-Output "LOOP: STOP - reviewer passed it on attempt $attempt. PR may open."
    exit 0
}
if ($attempt -ge $MaxAttempts) {
    Write-Output "LOOP: STOP - hit the cap of $MaxAttempts without a PASS. No PR."
    exit 2
}
Write-Output "LOOP: CONTINUE - reviewer rejected it, $($MaxAttempts - $attempt) attempts left"
exit 1
