# THE ENGINE. One command runs the whole draft-and-review body:
#   for each issue -> isolated worktree -> apply candidate -> commit -> review
# The three drafts run concurrently; the script waits for all of them.
#
#   .\engine.ps1
#
# This is an ENGINE, not a loop. It has no heartbeat to fire it and it writes no
# progress file, so every run starts from zero and knows nothing about the last
# one. See NOTES.md for what it would take to make it a loop.
$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
            [Environment]::GetEnvironmentVariable("Path","User")

$repo = $PSScriptRoot   # project5 is its own repo, so the script dir IS the root
$issues = @('dates', 'slug', 'paginate')
$wtRoot = Join-Path $PSScriptRoot 'worktrees'

Write-Output "=== engine start: $($issues.Count) candidates ==="

# --- clean any checkouts left by an earlier run ------------------------------
# git writes to stderr for "branch not found", which is expected on a first run,
# so these two calls must not be treated as failures.
$ErrorActionPreference = 'Continue'
foreach ($i in $issues) {
    $p = Join-Path $wtRoot $i
    if (Test-Path $p) { git -C $repo worktree remove $p --force *> $null }
    git -C $repo branch -D "cand/$i" *> $null
}
$ErrorActionPreference = 'Stop'

# --- fan out: one background job per candidate -------------------------------
$jobs = foreach ($issue in $issues) {
    Start-Job -Name $issue -ArgumentList $repo, $issue, $wtRoot -ScriptBlock {
        param($repo, $issue, $wtRoot)
        $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
                    [Environment]::GetEnvironmentVariable("Path","User")
        $wt = Join-Path $wtRoot $issue

        git -C $repo worktree add $wt -b "cand/$issue" main *> $null

        # The implementer's edit: drop the candidate over the buggy source.
        Copy-Item (Join-Path $repo "candidates\$issue.js") `
                  (Join-Path $wt "src\$issue.js") -Force

        git -C $wt add -A *> $null
        git -C $wt -c user.name="engine" -c user.email="engine@local" `
            commit -q -m "Candidate fix for $issue" *> $null

        "drafted $issue on cand/$issue"
    }
}

Write-Output "--- $($jobs.Count) drafts running in parallel ---"
$jobs | Wait-Job | Out-Null
$jobs | ForEach-Object { Receive-Job $_ | ForEach-Object { "  $_" } }
$jobs | Remove-Job

# --- the checker: reviewer exit code decides, one issue at a time ------------
Write-Output ""
Write-Output "=== review ==="
$results = @()
foreach ($issue in $issues) {
    $wt = Join-Path $wtRoot $issue
    & (Join-Path $PSScriptRoot 'review.ps1') -Issue $issue -Worktree $wt
    $verdict = if ($LASTEXITCODE -eq 0) { 'PASS' } else { 'FAIL' }
    $results += [pscustomobject]@{ Issue = $issue; Verdict = $verdict }
}

# --- summary -----------------------------------------------------------------
# @() forces an array even for a single match, otherwise .Count is empty.
$passed = @($results | Where-Object { $_.Verdict -eq 'PASS' }).Count
$failed = @($results | Where-Object { $_.Verdict -eq 'FAIL' }).Count
Write-Output ""
Write-Output "=== engine done: $passed PASS, $failed FAIL ==="
$results | ForEach-Object { "  $($_.Issue.PadRight(10)) $($_.Verdict)" }
Write-Output ""
Write-Output "(engine keeps no memory - run it again and it repeats all of this)"
