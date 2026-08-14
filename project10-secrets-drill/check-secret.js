#!/usr/bin/env node

// This script checks where the secret lives
// It demonstrates the difference between .env and environment variables

const fs = require('fs');
const path = require('path');

console.log('=== Secret Location Drill ===\n');

// Method 1: Try to read from .env file
console.log('Method 1: Reading from .env file');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const tokenLine = envContent.split('\n').find(line => line.startsWith('API_TOKEN='));
  if (tokenLine) {
    const token = tokenLine.split('=')[1];
    console.log(`  ✓ Found in .env: ${token.substring(0, 10)}...`);
  } else {
    console.log('  ✗ API_TOKEN not found in .env');
  }
} else {
  console.log('  ✗ .env file does not exist');
}

// Method 2: Try to read from environment variables
console.log('\nMethod 2: Reading from environment variables');
const envToken = process.env.API_TOKEN;
if (envToken) {
  console.log(`  ✓ Found in env: ${envToken.substring(0, 10)}...`);
} else {
  console.log('  ✗ API_TOKEN not found in environment');
}

// The lesson
console.log('\n=== The Lesson ===');
console.log('In local development: .env works because the file exists on your machine.');
console.log('In cloud (GitHub Actions, Routines): .env does NOT exist because:');
console.log('  1. .env is gitignored');
console.log('  2. Gitignored files never reach GitHub');
console.log('  3. Cloud clones start fresh from the repo');
console.log('  4. Fresh clone = no .env file');
console.log('\nSolution: Use environment variables panel in your CI/CD tool.');
console.log('The secret lives in the tool, not in the repo.');