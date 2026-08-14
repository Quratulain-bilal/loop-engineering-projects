# Project 9: Daily Lint Loop

A complete loop with all 6 parts, running unattended as a daily chore.

## The 6 Parts

### 1. Heartbeat (When it starts)
- **GitHub Actions schedule**: Every weekday at 9am
- **Manual trigger**: Available via workflow_dispatch
- **File**: `.github/workflows/daily-lint.yml`

### 2. Worktree (Isolation)
- Each fix drafted on its own branch: `claude/lint-fix-<slug>`
- No parallel edits to the same files
- Clean merge conflicts

### 3. Skill (Knowledge)
- **File**: `.opencode/skills/daily-lint/SKILL.md`
- Contains the complete lint sweep procedure
- Read at the start of every run

### 4. Maker-Checker (Subagents)
- **Maker**: Main agent drafts the lint fix
- **Checker**: Reviewer agent grades PASS/FAIL
- **File**: `.opencode/agents/reviewer.md`
- Checker is read-only, cannot edit files

### 5. Connector (Action)
- Opens PRs via GitHub API
- Posts summaries to workflow output
- Links related issues

### 6. Spine (Memory)
- **File**: `progress.md`
- Records what was done, what's in progress, what needs human
- Read at start, updated at end of every run
- Carries state between runs

## Budget Guards

- **Max runs per day**: 1
- **Max PRs per run**: 5
- **Max tokens per run**: 50,000
- **Timeout**: 10 minutes

## Setup

1. Push to GitHub
2. Add `ANTHROPIC_API_KEY` as a repository secret
3. The workflow runs automatically on schedule
4. Or trigger manually from the Actions tab

## How It Works

```
Every weekday at 9am:
  → Read progress.md (spine)
  → Run lint, find issues
  → For each issue:
      → Create branch (worktree)
      → Draft fix (maker)
      → Reviewer grades (checker)
      → If PASS: open PR (connector)
      → If FAIL: flag for human
  → Update progress.md (spine)
```

## Trust Model

- **Human on the loop**: Review PRs each morning
- **Human in the loop**: Risky fixes flagged for review
- **Human out of the loop**: Never - all changes go through PRs

## Concept 15 Reflection

After running for a week, ask:
- Did my understanding of the project keep up with what the loop changed?
- Am I still reading the diffs, or just trusting the green checks?
- Should the loop be slower, more cautious, or narrower?

If the answer is "I stopped reading," slow the loop down until you read again.