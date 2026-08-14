# The reviewer for one candidate. Its EXIT CODE is the verdict, so a caller can
# gate on it without parsing text: 0 = PASS, 1 = FAIL.
#
# Tests passing is necessary but NOT sufficient — a candidate that hardcodes the
# test inputs also passes. So this checks the diff too.
param(
    [Parameter(Mandatory)][string]$Issue,
    [Parameter(Mandatory)][string]$Worktree
)

$reasons = @()
$root = Resolve-Path $Worktree
$src = Join-Path $root "src\$Issue.js"

# --- rule 1: tests must pass, observed here, not reported to us -------------
Push-Location $root
try {
    node --test "test/$Issue.test.js" *> $null
    $testCode = $LASTEXITCODE
} finally {
    Pop-Location
}
if ($testCode -ne 0) { $reasons += "tests failed (exit $testCode)" }

# --- rule 2: no test file may be touched ------------------------------------
Push-Location $root
try {
    $touched = git diff --name-only main...HEAD 2>$null
} finally {
    Pop-Location
}
$badFiles = $touched | Where-Object { $_ -match '(^|/)test/' }
if ($badFiles) { $reasons += "test files modified: $($badFiles -join ', ')" }

# --- rule 3: no hardcoding of the values the tests use ----------------------
# A fix that branches on literal test inputs passes the suite while staying
# broken for every input the suite never tries.
$code = Get-Content $src -Raw
$literalBranches = [regex]::Matches($code, '(?m)^\s*if\s*\([^)]*===\s*[''"]')
if ($literalBranches.Count -gt 0) {
    $reasons += "$($literalBranches.Count) branch(es) compare against string literals - looks hardcoded to the test inputs"
}

# --- rule 4: assertions must not be weakened --------------------------------
if ($code -match 'assert\.ok\(true\)') { $reasons += "vacuous assertion found" }

# --- verdict ----------------------------------------------------------------
if ($reasons.Count -eq 0) {
    Write-Output "VERDICT: PASS  [$Issue]"
    Write-Output "  tests exit 0, no test files touched, no hardcoded literals"
    exit 0
}
Write-Output "VERDICT: FAIL  [$Issue]"
$n = 1
foreach ($r in $reasons) { Write-Output "  $n. $r"; $n++ }
exit 1
