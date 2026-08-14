# Routine Prompt for Secrets Drill

## First Run (WILL FAIL)

This Routine tries to read from .env file:

```
Read the API_TOKEN from the .env file in the repo root.
If found, print it. If not found, print what you tried instead.
```

**Expected Result:** FAILS because .env is gitignored and doesn't exist in the cloud clone.

**What Claude tries:**
1. Looks for .env file
2. File doesn't exist
3. May try to create it (but can't - no credentials)
4. Reports failure

---

## Second Run (WILL SUCCEED)

This Routine reads from environment variables:

```
Credentials are available as environment variables; do not look for a .env file.
Read the API_TOKEN from the environment and print the first 10 characters.
```

**Expected Result:** SUCCEEDS because the secret lives in the platform, not the repo.

**What Claude does:**
1. Reads process.env.API_TOKEN
2. Found it (set in repository secrets)
3. Prints the value
4. Done!

---

## The Mechanical Reason

**Why .env fails in cloud:**

1. `.env` is in `.gitignore`
2. Gitignored files are NEVER pushed to GitHub
3. Cloud runners (GitHub Actions, Routines) start with a fresh `git clone`
4. Fresh clone = no .env file
5. The file literally doesn't exist on the cloud machine

**Why environment variables work:**

1. Secrets are stored in the platform (GitHub, Anthropic, etc.)
2. They're injected at runtime, not stored in code
3. Cloud runners read them from the platform, not the filesystem
4. The secret exists in the tool, not the repo

---

## Setup Instructions

### For GitHub Actions:
1. Go to repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `API_TOKEN`
4. Value: your token
5. In workflow: `API_TOKEN: ${{ secrets.API_TOKEN }}`

### For Claude Code Routines:
1. Go to claude.ai → Routines → Edit routine
2. Environment → Variables
3. Add: `API_TOKEN` = your token
4. In prompt: "credentials are available as environment variables"

---

## Key Takeaway

**The secret lives in the platform, not the repo.**

- `.env` = local development only
- Environment variables = cloud/production
- Never commit secrets to git
- Always use your CI/CD tool's secrets feature