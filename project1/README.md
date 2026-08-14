Project 1 — A Watch Loop

Concept 4: In-Session Loop · Difficulty: Easy

What was the Problem?

You start a long-running task—such as a build, test, or download—that takes 5–10 minutes.

You end up sitting in front of the terminal, repeatedly checking:

> “Is it done? No… Is it done now?”



That wastes your time.

The Solution

Run the task in the background and use a small watcher that checks its status every minute.

When the task finishes, the watcher tells you.

You can continue doing other work while you wait.

Files

File	Purpose

long-task.js	The long-running task — 5 steps, 60 seconds per step. Creates output/result.json when finished.
check-task.ps1	The checker — checks whether result.json exists. Returns DONE or RUNNING.
output/progress.log	Written by the task itself to show live progress. Each line appears 60 seconds apart.
output/result.json	The flag — created only when the task is successfully completed.


How to Run

# 1. Start the task in the background (detached — the terminal stays free)
Start-Process node -ArgumentList "long-task.js 5 60000" -WindowStyle Hidden

# 2. Start the loop
#    /loop 1m Run check-task.ps1.
#    Stay silent when RUNNING; report when DONE and then stop.

# 3. Leave it running.
#    The loop will notify you when the task is DONE and then stop.

Quick Test

Use:

long-task.js 3 10000

This runs 3 steps × 10 seconds = 30 seconds.

The Main Lesson

When the task finishes, create a file.

That file acts as a flag.

The checker doesn't need to understand what is happening inside the task. It simply keeps looking for that one file.

Start-Process is important because it runs the task separately in the background.

If you simply run:

node long-task.js

the terminal will remain occupied until the task finishes, which defeats the whole purpose.

One Important Problem

The checker only looks for the flag file.

If the task crashes halfway through, result.json will never be created. The checker will keep saying:

RUNNING

even though the process is actually dead.

In a real system, the checker should also verify that the process is still alive, for example using:

Get-Process -Id <pid>

Or the task could create an error.json file when it fails.

What Actually Happened

The task started at 12:11:56 UTC and finished at 12:16:56 UTC—exactly 5 minutes later.

The loop checked 5 times:

Check 1 → RUNNING

Check 2 → RUNNING

Check 3 → RUNNING

Check 4 → RUNNING

Check 5 → DONE


The loop then stopped automatically.

You didn't have to sit and watch the terminal—that's the whole point of a watch loop.
