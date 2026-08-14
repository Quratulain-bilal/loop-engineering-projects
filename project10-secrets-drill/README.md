# Project 11: Secrets Drill

Learn where secrets live: .env file vs environment variables.

## The Drill

### Run 1: Will FAIL
- Secret in `.env` file
- Cloud clone doesn't have it
- Watch it fail

### Run 2: Will SUCCEED
- Secret in environment variables
- Cloud platform injects it
- Works perfectly

## Why This Happens

**`.env` is gitignored → never reaches GitHub → cloud clone has no `.env`**

**Environment variables are in the platform → injected at runtime → works**

## Files

- `.env` - Secret here (gitignored, won't reach GitHub)
- `.env.example` - Template (tracked by git)
- `.gitignore` - Ignores .env
- `check-secret.js` - Demonstrates both methods
- `.github/workflows/secret-drill.yml` - GitHub Actions demo
- `routine-prompt.md` - Claude Code Routine prompts

## Test It

### Local (works with .env):
```bash
node check-secret.js
# Both methods work locally
```

### Cloud (only env vars work):
```bash
# Push to GitHub
git remote add origin https://github.com/your-repo/secret-drill.git
git push -u origin main

# Add secret to repo:
# Settings → Secrets → Actions → New repository secret
# Name: API_TOKEN
# Value: your-token

# Run the workflow manually
# Actions → Secret Drill → Run workflow
```

## The Lesson

1. `.env` = local development only
2. Environment variables = cloud/production
3. Never commit secrets to git
4. Always use your CI/CD tool's secrets feature