
Project 2 — Make the Tests Pass, Then Stop

Concept 5: Conditional Loop · Concept 11: Maker-Checker · Difficulty: easy–medium

What was the Problem?

There are bugs in the code. You fix them, then think, “Looks good,” and move on.

But your opinion is not evidence.

The Solution

Run a loop that keeps trying until the tests pass. The command makes the decision, not you.

Maximum 6 attempts.

Files

File| Purpose
"src/kit.js"| 3 functions, each containing a bug
"test/kit.test.js"| Tests designed to catch those bugs
"run-tests.ps1"| Checker — runs the tests and returns an exit code (0 = pass)
"fix-loop.ps1"| Loop driver — counts attempts and enforces the cap
".attempts"| Counter stored in a file, not in my memory

How to Run

.\run-tests.ps1              # Run tests only
.\fix-loop.ps1 -Reset        # Reset counter to 0
.\fix-loop.ps1               # Run one attempt

Exit codes:

- "0" = Tests passed
- "1" = Continue
- "2" = Attempt cap reached

Result (What Actually Happened)

Attempt| Fix| Checker
0 (baseline)| Nothing| 0 pass / 4 fail
1| "average" — removed extra "- 1", added throw for empty input| 2 pass / 2 fail → CONTINUE
2| "titleCase" — process every word, lowercase the remaining letters| 3 pass / 1 fail → CONTINUE
3| "unique" — create a new array using "Set", leaving the input untouched| 4 pass / 0 fail → STOP

Attempt 3 of 6. There were 3 attempts remaining. Stopping because the cap was reached would have been a failure.

The Three Bugs

Function| Bug| Fix
"average"| "sum / length - 1" — extra minus one. Empty list returned "NaN".| Removed "- 1" and throw an error for an empty list
"titleCase"| Only the first letter was changed; the remaining letters stayed untouched — ""gOOd"" remained like that| Split on spaces, capitalize the first letter of every word, lowercase the rest
"unique"| "splice" modified the caller's array and caused an index to be skipped| Create a new array using "Set"; never modify the input

The Main Lessons

The command made the decision, not me.
I only changed the code. Whether the code was actually correct was determined by the "node --test" exit code. I could not simply say, “I think it's working.” My opinion had no authority.

The cap is stored in a file, not in memory.
".attempts" increases on every run. Even if the session restarts or I forget the previous attempts, the cap still applies.

Stopping because of the cap = failure.
There are two valid ways to stop:

1. Tests pass → exit code "0"
2. Attempts are exhausted → exit code "2"

These two outcomes are not the same.

One Honest Thing

The checker itself was broken the first time.

"node --test test/" treated the directory as a file, producing a ""FAIL"" that was not an actual test failure—it was an infrastructure error.

If I had not caught this, the loop would have continued fixing the code for 6 attempts even though the code was already correct, eventually dying at the cap.

That is why the first step should always be: confirm that the checker is failing for the real reason, not because of a typo or infrastructure mistake.
