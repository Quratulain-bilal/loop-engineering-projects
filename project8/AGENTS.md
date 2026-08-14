# AGENTS.md - Rules for the Daily Lint Loop

## Project Overview
This is a demo project for the daily lint loop (Project 9). The loop runs every weekday at 9am, finds lint issues, and drafts safe fixes.

## Build & Test Commands
- Install: `npm ci`
- Lint: `npm run lint`
- Lint fix: `npm run lint:fix`
- Test: `npm test`
- Typecheck: `npm run typecheck`

## Code Style
- Use `const` instead of `var`
- Always use semicolons
- No unused variables
- Functions should have clear return types in JSDoc

## Loop Rules
- Max 5 PRs per run
- Max 50000 tokens per run
- Never push to main directly
- All fixes go to `claude/*` branches
- When in doubt, escalate to "needs a human"

## Lint Fix Guidelines
- Only fix actual lint issues, no logic changes
- One fix per PR
- Keep changes minimal and focused
- If a fix seems risky, flag it for human review