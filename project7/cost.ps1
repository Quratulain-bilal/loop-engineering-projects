# Reads run.log, averages the measured tokens per beat, and prices the loop at
# several cadences. Concept 13's arithmetic, run against your own numbers
# instead of the book's example.
#
#   .\cost.ps1                  -> uses Sonnet list pricing
#   .\cost.ps1 -InPrice 3 -OutPrice 15
param(
    [double]$InPrice = 3,    # USD per million input tokens
    [double]$OutPrice = 15   # USD per million output tokens
)

$logPath = Join-Path $PSScriptRoot 'run.log'
if (-not (Test-Path $logPath)) { Write-Output "no run.log yet - run scan.js at least once"; exit 1 }

$beats = Select-String -Path $logPath -Pattern 'in=~(\d+) out=~(\d+)' -AllMatches
if (-not $beats) { Write-Output "run.log has no token records"; exit 1 }

$inTotal = 0; $outTotal = 0; $n = 0
foreach ($b in $beats) {
    $m = $b.Matches[0]
    $inTotal += [int]$m.Groups[1].Value
    $outTotal += [int]$m.Groups[2].Value
    $n++
}

$avgIn = [math]::Round($inTotal / $n)
$avgOut = [math]::Round($outTotal / $n)
$perBeat = ($avgIn / 1e6 * $InPrice) + ($avgOut / 1e6 * $OutPrice)

Write-Output "=== measured from $n beat(s) in run.log ==="
Write-Output "  avg tokens in : ~$avgIn"
Write-Output "  avg tokens out: ~$avgOut"
Write-Output ("  cost per beat : `$" + $perBeat.ToString('F6') + "  (at `$$InPrice/M in, `$$OutPrice/M out)")
Write-Output ""

# Beats per month for each cadence. 20 working days, 30 calendar days.
$cadences = [ordered]@{
    'once a weekday (this loop)' = 20
    'hourly, 24/7'               = 720
    'every 5 min, 24/7'          = 8640
}

Write-Output "=== monthly cost by cadence ==="
foreach ($c in $cadences.GetEnumerator()) {
    $monthly = $perBeat * $c.Value
    $line = "  {0,-28} {1,6} beats  =  `${2}" -f $c.Key, $c.Value, $monthly.ToString('F4')
    Write-Output $line
}
Write-Output ""
Write-Output "The work per beat is identical in all three rows."
Write-Output "Cadence is the whole difference - that is Concept 13."
