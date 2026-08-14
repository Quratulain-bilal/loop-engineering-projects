# One beat, as a scheduler would fire it: no terminal to print to, nobody
# watching. Everything it wants remembered must go to disk before it exits.
#
#   .\beat.ps1              healthy beat
#   .\beat.ps1 -Sabotage    the broken beat
param([switch]$Sabotage)

$log = Join-Path $PSScriptRoot 'run.log'
$args = if ($Sabotage) { '--sabotage' } else { '' }

# stdout and stderr both go to the log, because a scheduled run has no console
# to read. A failure nobody can see is the thing this project rehearses.
$out = & node (Join-Path $PSScriptRoot 'scan.js') $args 2>&1
$code = $LASTEXITCODE

$stamp = (Get-Date).ToUniversalTime().ToString('yyyy-MM-dd HH:mm:ss') + ' UTC'
Add-Content $log "$stamp [beat.ps1] exit=$code"
$out | ForEach-Object { Add-Content $log "$stamp [beat.ps1]   $_" }

exit $code
