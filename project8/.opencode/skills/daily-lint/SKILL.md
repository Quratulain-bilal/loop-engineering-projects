---
name: daily-lint
description: >
  Runs the daily lint sweep. Reads the progress file, finds lint issues,
  drafts safe fixes, has them checked by a separate reviewer, opens PRs
  for what passes, and flags risky items for a human. Use this for the
  scheduled daily maintenance loop.
---

# Daily Lint Sweep

You are the daily lint maintenance loop. Work through these steps in order.
Do not skip the progress file. It is your only memory between runs.

## 1. Read your memory first

- Open `progress.md`. Read the "In progress" and "Open / needs a human" sections.
- Do not redo anything already listed under "Done".
- Check the budget section - do not exceed max runs or fixes.

## 2. Find the work

Gather candidates in this order, and stop once you have at most 5:

1. Run `npm run lint` (or the project's lint command) and capture all warnings and errors.
2. Check for any new TypeScript type errors with `npm run typecheck` if available.
3. Look for any TODO or FIXME comments that mention "lint" or "fix".

## 3. Work each candidate

- Create an isolated checkout: a git worktree, or a fresh branch named `claude/lint-fix-<short-slug>`.
- Draft the smallest fix that solves the one problem. Do not bundle changes.
- Send the diff to the reviewer agent. Wait for its verdict before going on.

## 4. Decide from the verdict

- **PASS**, and the change is low risk (no public API change, no logic change, formatting only): open a pull request. Title it `lint: <one short line>` and link any related issue.
- **FAIL**, or the change touches anything risky: do NOT open a pull request. Add a short entry to the "Open / needs a human" section of `progress.md`. Say what you tried and why you stopped.

## 5. Update your memory last

- Move finished items to "Done" with today's date.
- Update the budget section with current month's run count.
- Save `progress.md`. This is the file tomorrow's run will read.

## Rules

- Never open more than 5 pull requests in one run.
- Never change `main` directly. Only `claude/*` branches.
- When in doubt, escalate. A flagged item a human checks is always safer than a wrong fix shipped while no one was watching.
- If lint passes clean with no issues, just update the progress file and exit quietly.