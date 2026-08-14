# PR Review Test Project

This project demonstrates automated PR review using OpenCode's GitHub integration, showcasing all four heartbeat patterns.

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Test planted bugs
node test-bugs.js

# Run review simulation
node simulate-review.js

# Start webhook server
node webhook-simulator.js
```

## Project Structure

- `src/utils.js` - Contains planted bugs (off-by-one, null check)
- `src/utils.test.js` - Test suite
- `.github/workflows/pr-review.yml` - GitHub Actions workflow
- `simulate-review.js` - Local review simulation
- `webhook-simulator.js` - Webhook server for testing
- `test-webhook.js` - Webhook event tests
- `heartbeat-demo.js` - Demonstrates all heartbeat patterns

## Planted Bugs

The `src/utils.js` file contains intentional bugs:

1. **Off-by-one error** in `calculateAverage`: Uses `i <= numbers.length` instead of `i < numbers.length`
2. **Missing null check** in `includes`: Doesn't validate the `value` parameter

## How It Works

### Event-Driven Heartbeat Flow

1. Developer creates PR with bug
2. GitHub webhook fires: `pull_request.opened`
3. Automated review runs and finds bug
4. Review posts comment on PR
5. Developer fixes bug and pushes
6. GitHub webhook fires: `pull_request.synchronize`
7. Re-review confirms fix
8. PR approved and merged

### Four Heartbeat Patterns

1. **In-Session**: Real-time code analysis during development
2. **Conditional**: Quality threshold checks (test coverage, complexity)
3. **Scheduled**: Regular security scans and updates
4. **Event-Driven**: PR review triggers on GitHub events

## GitHub Setup

### Option 1: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI from https://cli.github.com/

# Create repository and push
gh repo create pr-review-test --public --source=. --remote=origin --push

# Create PR with bug fix
git checkout -b fix/bugs
git add .
git commit -m "Fix bugs"
git push -u origin fix/bugs
gh pr create --title "Fix bugs" --body "Fixes off-by-one and null check issues"
```

### Option 2: Manual Setup

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/pr-review-test.git

# Push code
git push -u origin master

# Create branch and PR
git checkout -b fix/bugs
git add .
git commit -m "Fix bugs"
git push -u origin fix/bugs
# Create PR on GitHub website
```

## Testing Locally

```bash
# Test that bugs exist
node test-bugs.js

# Run review simulation
node simulate-review.js

# Start webhook server (port 3000)
node webhook-simulator.js

# In another terminal, test webhooks
node test-webhook.js
```

## What Happens When You Push

1. GitHub Actions workflow triggers on PR events
2. Workflow runs tests and analyzes code
3. Review finds planted bugs (off-by-one, null check)
4. Review posts comment on PR with issues
5. Developer fixes bugs and pushes new commit
6. Workflow triggers again (synchronize event)
7. Re-review confirms fixes
8. PR approved and merged

## Event Heartbeat Complete

This project demonstrates all four heartbeat patterns working together:
- In-session: Real-time code analysis
- Conditional: Quality threshold checks
- Scheduled: Regular security scans
- Event-driven: PR review triggers

All four heartbeats are now working!