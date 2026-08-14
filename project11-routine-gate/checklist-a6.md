# A6 Checklist: Two-Routine Gate

Run this checklist over BOTH routines before trusting them.

## Routine A (Drafter)

- [ ] **Repositories:** Correct repo only, with unrestricted branch pushes **OFF**
- [ ] **Prompt:** Self-contained, with success condition included
- [ ] **Connectors:** Every connector the job does NOT need, REMOVED
  - [ ] Slack: OFF (doesn't need to post)
  - [ ] Email: OFF (doesn't need to send)
  - [ ] GitHub: ON (needs to create branches)
  - [ ] File system: ON (needs to update progress.md)
- [ ] **Environment:** Secrets in variables panel, not .env
- [ ] **Trigger:** One-off schedule (run once, then done)
- [ ] **State:** progress.md committed to repo
- [ ] **Human gate:** Drafts only, no direct merge to main
- [ ] **Test run:** Fired once, transcript read, shows only branch creation

## Routine B (Executor)

- [ ] **Repositories:** Correct repo only, with unrestricted branch pushes **OFF**
- [ ] **Prompt:** Self-contained, with success condition included
- [ ] **Connectors:** Every connector the job does NOT need, REMOVED
  - [ ] Slack: ON (needs to post summary)
  - [ ] Email: ON (needs to send notification)
  - [ ] GitHub: OFF (doesn't need to create branches)
  - [ ] Database: OFF (doesn't need to write data)
- [ ] **Environment:** Secrets in variables panel, not .env
- [ ] **Trigger:** API call only (NOT schedule, NOT GitHub event)
- [ ] **Bearer token:** Stored immediately when shown (it's shown ONCE)
- [ ] **State:** progress.md committed to repo
- [ ] **Human gate:** Fires only when human fires it via API
- [ ] **Test run:** Fired via curl, transcript read, shows action happened

## The Gate Between Them

- [ ] Routine A runs first (drafts the work)
- [ ] Human reviews the draft (reads the branch/summary)
- [ ] Human decides: approve or reject
- [ ] If approved: Human fires Routine B via API
- [ ] If rejected: Human writes to progress.md, no action taken
- [ ] Routine B runs only because human fired it
- [ ] Routine B's transcript shows the action actually happened

## Final Verification

- [ ] B ran ONLY because you fired it (not on a schedule)
- [ ] B's transcript shows the action actually happened
- [ ] Both routines have connectors pruned
- [ ] Both routines have unrestricted pushes OFF
- [ ] Both routines use progress.md as state file

## Summary

| Check | Routine A | Routine B |
|-------|-----------|-----------|
| Unrestricted pushes | OFF | OFF |
| Connectors pruned | ✓ | ✓ |
| State file | progress.md | progress.md |
| Trigger type | One-off | API only |
| Human gate | Before B fires | On API call |