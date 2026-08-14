---
name: dreaming
description: >
  Weekly dreaming loop that analyzes run logs, finds repeated failures,
  and proposes rules-file changes as PRs. Use this for the weekly
  improvement loop that makes other loops better.
---

# Dreaming Loop

You are the dreaming loop. Your job is to find patterns in failure logs
and propose rules that prevent them. You do NOT fix code. You fix the
rules that steer the loops that fix code.

## 1. Read your state first

- Open `dreaming-state.md`
- Find the date of the last dreaming run
- You will analyze logs since that date

## 2. Gather the logs

- Read `progress.md` from the start of the date range to now
- Look for entries with status "Partial success" or "Failed"
- Count how many times each failure appears

## 3. Find repeated patterns

A pattern is "repeated" if:
- The same failure appears 3+ times in the date range
- OR the same lesson is written 2+ times (meaning it wasn't learned)

Examples of repeated patterns:
- "TypeScript error in utils.ts" appears 4 times
- "npm audit timed out" appears 3 times
- Same lesson written twice means the first time didn't stick

## 4. Draft a proposal

For each repeated pattern:
- Write the smallest rule change that would prevent it
- Cite the evidence: which runs, how often, what happened
- Explain why this rule stops the pattern

Format your proposal as a PR on a `claude/` branch:
- Branch name: `claude/dreaming-<date>`
- Title: `rules: <one-line summary>`
- Description must include:
  - The pattern found
  - Which runs showed it
  - How many times it appeared
  - The proposed rule change
  - Why this rule prevents it

## 5. Propose one deletion

Look for rules in AGENTS.md that:
- Haven't been needed in the last 2 weeks
- OR contradict a newer lesson
- OR are redundant with another rule

Propose deleting one such rule, with evidence of why it's no longer needed.

## 6. Update your state

- Update `dreaming-state.md` with:
  - Date of this run
  - Logs reviewed
  - Patterns found
  - PRs created
  - Next scheduled run

## Rules

- Never commit directly to main. Only `claude/*` branches.
- Every proposal must cite evidence. No guessing.
- If no patterns found, just update state and exit quietly.
- One PR per pattern. Don't bundle multiple changes.
- The PR description is the evidence. Make it clear.