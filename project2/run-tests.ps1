# The checker. This command — not the agent — decides whether the work is done.
# Prints the test output, then a single verdict line, and exits with the
# runner's own exit code (0 = all passed, non-zero = something failed).
$ErrorActionPreference = 'Continue'

Push-Location $PSScriptRoot
try {
    node --test "test/*.test.js"
    $code = $LASTEXITCODE
} finally {
    Pop-Location
}

if ($code -eq 0) {
    Write-Output "VERDICT: PASS"
} else {
    Write-Output "VERDICT: FAIL (exit $code)"
}
exit $code
