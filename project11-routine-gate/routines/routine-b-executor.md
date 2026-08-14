# Routine B: The Executor

## Purpose
Performs ONE small follow-up action. Fires ONLY when triggered by API.

## Trigger
- API call with bearer token
- Token shown ONCE - store it immediately!

## API Endpoint
```
POST https://api.anthropic.com/v1/claude_code/routines/<routine-id>/fire
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Approved draft from Routine A. Execute the action now."
}
```

## Prompt
```
You are the executor routine. You fire ONLY when triggered by API.

1. Read progress.md to see what was approved
2. Find the approved draft in the "In Progress" section
3. Perform ONE small action:
   - Post a summary to a connector (Slack, email, etc.)
   - OR update a ticket status
   - OR send a notification
4. Move the item from "In Progress" to "Done"
5. Exit

Rules:
- You ONLY run when fired via API
- You NEVER run on a schedule
- You perform exactly ONE action
- You do NOT create branches or merge code
- You do NOT make changes to the repo
```

## What It Produces
- A posted summary, notification, or ticket update
- Updated progress.md
- NO code changes, NO merges

## Connectors (Pruned)
- ✓ Slack (to post summary)
- ✓ Email (to send notification)
- ✗ GitHub (doesn't need to create branches)
- ✗ Database (doesn't need to write data)

## Unrestricted Pushes
- ✗ OFF (doesn't push code at all)

## State File
- progress.md (reads at start, updates at end)

## Bearer Token
- Shown ONCE when routine is created
- Store immediately in a secure place
- If lost, must regenerate (old one is revoked)