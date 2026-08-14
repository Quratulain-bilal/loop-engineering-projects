# One "routine" run. Summarizes yesterday's commits onto a branch.
#
#   .\task.ps1              the working version
#   .\task.ps1 -Broken      reads a file that does not exist
#
# Both versions EXIT 0. That is the whole point of this project: the exit code
# (the "status column") reports whether the session ended cleanly, not whether
# the task succeeded. Only the transcript tells you which happened.
param([switch]$Broken)

$ErrorActionPreference = 'Continue'
$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
            [Environment]::GetEnvironmentVariable("Path","User")

$root = $PSScriptRoot
$runId = if ($Broken) { 'broken' } else { 'working' }
$transcript = Join-Path $root "transcript-$runId.log"
$stamp = { (Get-Date).ToUniversalTime().ToString('yyyy-MM-dd HH:mm:ss') + ' UTC' }

function Say($line) {
    $text = "$(& $stamp)  $line"
    Add-Content $transcript $text
    Write-Output $text
}

Set-Content $transcript "=== run: $runId ===" -Encoding utf8
Say "session started"

# The working run reads the repo's own commit log. The broken run is pointed at
# a config file nobody created — the classic "routine reads a file that isn't
# in the fresh clone" failure.
$source = if ($Broken) { Join-Path $root 'summary-config.json' } else { 'git-log' }
Say "reading source: $source"

$commits = $null
if ($Broken) {
    if (Test-Path $source) {
        $commits = Get-Content $source -Raw
    } else {
        # Note what happens here: it complains, then CARRIES ON. No throw, no
        # non-zero exit. This is how a routine ends "green" having done nothing.
        Say "WARN could not read $source - continuing without it"
    }
} else {
    $commits = git -C $root log --since="24 hours ago" --pretty=format:"%h %s" 2>$null
    if (-not $commits) { $commits = git -C $root log -5 --pretty=format:"%h %s" 2>$null }
}

if ($commits) {
    Say "found $((($commits -split "`n") | Measure-Object).Count) commit(s)"
} else {
    Say "no commit data gathered"
}

# Write the summary. With no data, this writes an empty summary and says so.
$summaryPath = Join-Path $root 'SUMMARY.md'
$body = @("# Commit summary", "", "_generated $(& $stamp) by run '$runId'_", "")
if ($commits) {
    ($commits -split "`n") | ForEach-Object { $body += "- $_" }
} else {
    $body += "(nothing to summarize)"
}
Set-Content $summaryPath ($body -join "`n") -Encoding utf8
Say "wrote SUMMARY.md ($((Get-Content $summaryPath | Measure-Object -Line).Lines) lines)"

# Commit it to a claude/summary branch, mirroring a routine's branch rule.
git -C $root add -A 2>&1 | Out-Null
git -C $root -c user.name="routine" -c user.email="routine@local" `
    commit -q -m "Commit summary from run '$runId'" 2>&1 | Out-Null
Say "committed to $(git -C $root branch --show-current)"

Say "session ended cleanly"
exit 0   # <-- always. Read the transcript, not this.
