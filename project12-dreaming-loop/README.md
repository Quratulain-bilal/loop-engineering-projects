# Project 13: Dreaming Loop

A weekly loop that reads other loops' logs and proposes rule changes.

## The Pattern

```
Daily loops write logs → Weekly dreaming reads logs → Proposes rules as PR → Human merges
```

## How It Works

### Step 1: Daily loops write logs
- Each run updates progress.md with findings
- Logs include: run ID, status, findings, lessons
- Repeated failures appear across multiple runs

### Step 2: Dreaming loop reads logs (weekly)
- Reads dreaming-state.md for last run date
- Analyzes progress.md since that date
- Counts occurrences of each failure type

### Step 3: Finds repeated patterns
- Failure appearing 3+ times = pattern
- Lesson written 2+ times = not learned
- Drafts smallest rule change to prevent it

### Step 4: Creates PR with evidence
- Branch: `claude/dreaming-<date>`
- Title: `rules: <summary>`
- Description includes:
  - Pattern found
  - Which runs showed it
  - How many times
  - Proposed rule
  - Why it prevents the pattern

### Step 5: Proposes one deletion
- Rule not needed in 2+ weeks
- Rule contradicts newer lesson
- Rule is redundant

### Step 6: Updates dreaming-state.md
- Records what was analyzed
- What was proposed
- Next scheduled run

## Files

- `dreaming-state.md` - Spine for dreaming loop
- `progress.md` - Daily loop logs (input)
- `AGENTS.md` - Rules file (may get updated)
- `.opencode/skills/dreaming/SKILL.md` - Dreaming instructions
- `.opencode/agents/dreaming-analyst.md` - Log analyst subagent
- `.github/workflows/dreaming-loop.yml` - Weekly schedule
- `logs/analysis-2026-08-14.md` - Sample analysis

## Verification

Three conditions must be true:

1. **PR traces to real logs** - Every proposal cites run IDs and occurrence counts
2. **Planted failures get caught** - Repeated patterns in logs become proposals
3. **No changes without human merge** - All changes go through PRs

## Setup

1. Push to GitHub
2. Add `ANTHROPIC_API_KEY` as repository secret
3. Dreaming loop runs every Monday at 10am
4. Or trigger manually from Actions tab

## Budget Guards

- Max 1 PR per pattern
- Max 3 patterns per run
- Timeout: 15 minutes
- If no patterns found, just updates state

## Key Concepts

- **Spine**: dreaming-state.md carries state between runs
- **Evidence-based**: Every proposal cites specific runs
- **Human gate**: All changes go through PRs
- **Improvement loop**: Makes other loops better over time