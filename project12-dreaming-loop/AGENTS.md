# AGENTS.md - Rules for the Daily Loop

## Project Overview
This is a demo project for the dreaming loop (Project 12). The daily loop runs every weekday, and the dreaming loop runs weekly to improve it.

## Build & Test Commands
- Install: `npm ci`
- Lint: `npm run lint`
- Test: `npm test`
- Typecheck: `npm run typecheck`

## Current Rules

### Rule 1: Always run tests before committing
- Every fix must pass tests before opening a PR
- If tests fail, the fix is not ready

### Rule 2: Keep changes minimal
- One fix per PR
- Don't bundle unrelated changes
- Smallest possible diff

### Rule 3: Escalate when uncertain
- If a fix seems risky, flag for human review
- Better to ask than to ship a wrong fix

### Rule 4: Use const instead of var
- All new code must use const/let
- Never use var

### Rule 5: Always use semicolons
- JavaScript/TypeScript must have semicolons
- ESLint enforces this

## Lessons Learned
- TypeScript errors need type annotations in the diff
- npm audit sometimes times out on large repos
- Lint issues are usually safe to fix automatically

## Deprecated Rules
- None yet (dreaming loop will propose deletions here)