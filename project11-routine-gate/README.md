# Project 12: Two-Routine Gate

The human gate from Part 5, built with real parts.

## The Pattern

```
Routine A (drafts) → Human reviews → Routine B (executes)
```

## How It Works

### Step 1: Routine A runs (one-off schedule)
- Creates a `claude/` branch with draft
- Updates progress.md
- Does NOT merge or ship anything
- Human reviews the draft

### Step 2: Human reviews
- Read the draft on the `claude/` branch
- Decide: approve or reject
- If approved: fire Routine B
- If rejected: update progress.md, stop

### Step 3: Human fires Routine B (API call)
```bash
curl -X POST https://api.anthropic.com/v1/claude_code/routines/<routine-id>/fire \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Approved draft. Execute now."}'
```

- Routine B runs ONLY because you fired it
- Performs the action (posts summary, etc.)
- Updates progress.md

## Files

- `routines/routine-a-drafter.md` - Drafts the work
- `routines/routine-b-executor.md` - Executes when fired
- `checklist-a6.md` - A6 verification checklist
- `progress.md` - State file (spine)

## A6 Checklist Applied

| Check | Routine A | Routine B |
|-------|-----------|-----------|
| Unrestricted pushes | OFF | OFF |
| Connectors pruned | ✓ | ✓ |
| State file | progress.md | progress.md |
| Trigger type | One-off | API only |
| Human gate | Before B fires | On API call |

## Why This Matters

- **Routine A cannot ship code** (only drafts)
- **Routine B cannot run on its own** (needs API fire)
- **Human decides what gets shipped**
- **Human is the gate between draft and action**

## Setup

1. Create Routine A at claude.ai/code/routines
2. Create Routine B with API trigger
3. Store B's bearer token (shown ONCE!)
4. Run A once to draft
5. Review the draft
6. Fire B via curl if approved

## Key Concepts

- **A3**: API trigger for Routine B
- **A4**: The gate (human decides)
- **A6**: The checklist (pruned connectors, no unrestricted pushes, state file)