# Routine A: The Drafter

## Purpose
Drafts something reviewable. Does NOT ship anything.

## Trigger
- One-off schedule (run once, then done)
- Or manual trigger for testing

## Prompt
```
You are the drafter routine. Your job is to CREATE, not to SHIP.

1. Read progress.md to see what needs drafting
2. Create a draft on a claude/ branch:
   - Branch name: claude/draft-<date>
   - Content: A summary of recent changes, or a proposed fix
   - Do NOT merge to main
   - Do NOT push to main
3. Write the draft location to progress.md under "In Progress"
4. Exit

Rules:
- You may only create branches starting with claude/
- You may never push to main
- You may never merge anything
- Your output is a draft for human review
```

## What It Produces
- A `claude/` branch with the draft
- An entry in progress.md noting the draft exists
- NO merged code, NO shipped changes

## Connectors (Pruned)
- ✗ No Slack (doesn't need to post)
- ✗ No email (doesn't need to send)
- ✓ GitHub (to create the branch)
- ✓ File system (to update progress.md)

## Unrestricted Pushes
- ✗ OFF (can only push to claude/* branches)

## State File
- progress.md (reads at start, updates at end)

## Human Gate
- After Routine A runs, a HUMAN must review the draft
- The human decides: approve or reject
- Only if approved does Routine B fire