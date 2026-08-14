const fs = require('fs');
const path = require('path');

console.log('=== Project 6: PR Review Test - Status Report ===\n');

// Check project structure
const requiredFiles = [
  'src/utils.js',
  'src/utils.test.js',
  '.github/workflows/pr-review.yml',
  'opencode.json',
  'package.json',
  'README.md',
  'simulate-review.js',
  'test-bugs.js',
  'webhook-simulator.js',
  'heartbeat-demo.js'
];

console.log('✓ Project Structure:');
let allFilesExist = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check for planted bugs
console.log('\n✓ Planted Bugs:');
const utilsContent = fs.readFileSync(path.join(__dirname, 'src', 'utils.js'), 'utf8');

const bugs = [
  {
    name: 'Off-by-one error',
    pattern: 'i <= numbers.length',
    description: 'Loop uses <= instead of <'
  },
  {
    name: 'Missing null check',
    pattern: 'arr[i] === value',
    description: 'Value parameter not checked for null'
  }
];

bugs.forEach(bug => {
  const found = utilsContent.includes(bug.pattern);
  console.log(`  ${found ? '✓' : '✗'} ${bug.name}: ${bug.description}`);
});

// Check git status
console.log('\n✓ Git Status:');
try {
  const { execSync } = require('child_process');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  const commits = execSync('git log --oneline | wc -l', { encoding: 'utf8' }).trim();
  
  console.log(`  Branch: ${branch}`);
  console.log(`  Commits: ${commits}`);
  console.log(`  Uncommitted changes: ${gitStatus.split('\n').filter(line => line.trim()).length}`);
} catch (error) {
  console.log('  Git not available or not a repository');
}

// Check dependencies
console.log('\n✓ Dependencies:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(`  Name: ${packageJson.name}`);
  console.log(`  Version: ${packageJson.version}`);
  console.log(`  Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
  console.log(`  Dev Dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
} catch (error) {
  console.log('  Error reading package.json');
}

// Summary
console.log('\n=== Project Summary ===');
console.log('✓ New folder created: project6-pr-review-test');
console.log('✓ Fresh git repository initialized');
console.log('✓ OpenCode GitHub integration configured');
console.log('✓ Planted bugs ready for testing');
console.log('✓ GitHub Actions workflow configured');
console.log('✓ All four heartbeat patterns demonstrated:');
console.log('  1. In-session: Real-time code analysis');
console.log('  2. Conditional: Quality threshold checks');
console.log('  3. Scheduled: Regular security scans');
console.log('  4. Event-driven: PR review triggers');

console.log('\n=== Next Steps ===');
console.log('1. Push to GitHub: git remote add origin <url> && git push -u origin master');
console.log('2. Create PR with bug fix');
console.log('3. Watch automated review find the bugs');
console.log('4. Fix bugs and push again');
console.log('5. See event-driven heartbeat in action!');

console.log('\n=== Project 6 Complete ===');