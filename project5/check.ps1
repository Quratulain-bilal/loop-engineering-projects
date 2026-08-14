# The checker for one issue. Exit code is the verdict: 0 = PASS, non-zero = FAIL.
#   .\check.ps1 -Issue slug
#   .\check.ps1                 -> all issues
param([string]$Issue)

Push-Location $PSScriptRoot
try {
    if ($Issue) { node --test "test/$Issue.test.js" } else { node --test "test/*.test.js" }
    $code = $LASTEXITCODE
} finally {
    Pop-Location
}

if ($code -eq 0) { Write-Output "TESTS: PASS" } else { Write-Output "TESTS: FAIL (exit $code)" }
exit $code
