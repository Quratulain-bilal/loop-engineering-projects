# Engine vs loop

## What `engine.ps1` is

One command that runs the whole draft-and-review body with no step-by-step
prompting: three candidates, three isolated worktrees drafted concurrently, and
a reviewer verdict for each. The reviewer's **exit code** is the checker — the
caller gates on `$LASTEXITCODE`, not on parsing text.

Run twice, it produced identical output both times.

## Why it is an engine and not a loop

Two things are missing, and they are exactly the two things the interlude warns
about:

**1. No heartbeat.** Nothing fires it. It runs when a human types the command
and never otherwise. A loop has something outside itself that wakes it —
`CronCreate`, `ScheduleWakeup`, Task Scheduler, a CI trigger.

**2. No progress file.** It writes nothing that survives the run. Run 2 could not
tell you that Run 1 had already reviewed `slug` and rejected it — it drafted and
reviewed all three again from scratch. A loop has a file its agents read at the
start and append to at the end, so run N+1 begins where run N stopped.

Proof on this machine: after two runs, `project5/` contains only scripts, test
files, candidates and sources. No `progress.md`, no `.state.json`, nothing. The
engine is stateless by construction.

## What it would take to become a loop

| Missing piece | Concretely |
|---|---|
| Heartbeat | `CronCreate` firing `engine.ps1` on a schedule, or `ScheduleWakeup` for self-paced runs |
| Progress file | `project5/progress.md` — engine reads recorded verdicts first, skips candidates already PASSed, appends only what changed |

That is the whole difference. The body of the work — fan-out, isolation,
checking — is identical in both. An engine is a loop's body without its clock
and without its memory.

## Cross-reference

- `project-one` — heartbeat with no body worth speaking of (a poller)
- `project3` — progress file as memory (`scan.js` reads its own log back)
- `project4` — the body, run once by hand
- `project5` — the body, codified into one command
- `loop.ps1` here — the body plus both missing pieces
