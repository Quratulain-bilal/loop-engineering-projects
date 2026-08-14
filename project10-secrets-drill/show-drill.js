const fs = require('fs');
const path = require('path');

console.log('=== Project 10: Secrets Drill Summary ===\n');

console.log('THE QUESTION:');
console.log('Where should secrets live? .env file or environment variables?\n');

console.log('THE ANSWER:');
console.log('Depends on WHERE you run:\n');

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ LOCAL DEVELOPMENT (your machine)                          │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ • .env file EXISTS on your machine                         │');
console.log('│ • .env file is gitignored (not in repo)                    │');
console.log('│ • Environment variables not set (unless you set them)      │');
console.log('│ • RESULT: .env works, env vars don\'t                       │');
console.log('└─────────────────────────────────────────────────────────────┘\n');

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ CLOUD (GitHub Actions, Claude Routines)                   │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ • Fresh git clone from repo                                │');
console.log('│ • .env is gitignored → NOT in repo → NOT in clone          │');
console.log('│ • .env file DOES NOT EXIST on cloud machine                │');
console.log('│ • Environment variables injected by platform               │');
console.log('│ • RESULT: .env fails, env vars work                        │');
console.log('└─────────────────────────────────────────────────────────────┘\n');

console.log('THE MECHANICAL REASON:');
console.log('1. .env is in .gitignore');
console.log('2. Gitignored files are NEVER pushed to GitHub');
console.log('3. Cloud runners start with fresh `git clone`');
console.log('4. Fresh clone = no .env file');
console.log('5. The file literally doesn\'t exist on the cloud machine\n');

console.log('THE FIX:');
console.log('1. Store secrets in your CI/CD tool\'s secrets panel');
console.log('2. Inject them as environment variables at runtime');
console.log('3. Never commit secrets to git\n');

console.log('FILES IN THIS DRILL:');
const files = [
  '.env - Secret here (gitignored, won\'t reach GitHub)',
  '.env.example - Template (tracked by git)',
  '.gitignore - Ignores .env',
  'check-secret.js - Demonstrates both methods',
  '.github/workflows/secret-drill.yml - GitHub Actions demo',
  'routine-prompt.md - Claude Code Routine prompts'
];
files.forEach(f => console.log(`  • ${f}`));

console.log('\n=== Drill Complete ===');