# Runs the cart tests in whatever checkout it is called from.
# Exits with the runner's own code: 0 = all passed, non-zero = something failed.
Push-Location $PSScriptRoot
try {
    node --test "test/*.test.js"
    $code = $LASTEXITCODE
} finally {
    Pop-Location
}

if ($code -eq 0) { Write-Output "VERDICT: PASS" } else { Write-Output "VERDICT: FAIL (exit $code)" }
exit $code
