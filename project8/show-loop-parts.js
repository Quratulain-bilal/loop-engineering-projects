const fs = require('fs');
const path = require('path');

console.log('=== Project 9: Daily Lint Loop - All 6 Parts ===\n');

// Part 1: Heartbeat
console.log('1. HEARTBEAT (When it starts)');
console.log('   File: .github/workflows/daily-lint.yml');
console.log('   Schedule: Every weekday at 9am');
console.log('   Manual trigger: workflow_dispatch');
console.log('');

// Part 2: Worktree
console.log('2. WORKTREE (Isolation)');
console.log('   Pattern: claude/lint-fix-<slug>');
console.log('   Each fix on its own branch');
console.log('   No parallel file conflicts');
console.log('');

// Part 3: Skill
console.log('3. SKILL (Knowledge)');
console.log('   File: .opencode/skills/daily-lint/SKILL.md');
const skillPath = path.join(__dirname, '.opencode', 'skills', 'daily-lint', 'SKILL.md');
if (fs.existsSync(skillPath)) {
  const skillContent = fs.readFileSync(skillPath, 'utf8');
  const lines = skillContent.split('\n').length;
  console.log(`   Lines: ${lines}`);
}
console.log('');

// Part 4: Maker-Checker
console.log('4. MAKER-CHECKER (Subagents)');
console.log('   Maker: Main agent drafts fixes');
console.log('   Checker: .opencode/agents/reviewer.md');
const reviewerPath = path.join(__dirname, '.opencode', 'agents', 'reviewer.md');
if (fs.existsSync(reviewerPath)) {
  const reviewerContent = fs.readFileSync(reviewerPath, 'utf8');
  const hasPassFail = reviewerContent.includes('PASS') && reviewerContent.includes('FAIL');
  console.log(`   Has PASS/FAIL: ${hasPassFail}`);
}
console.log('');

// Part 5: Connector
console.log('5. CONNECTOR (Action)');
console.log('   Opens PRs via GitHub API');
console.log('   Posts to workflow summary');
console.log('   Links issues');
console.log('');

// Part 6: Spine
console.log('6. SPINE (Memory)');
console.log('   File: progress.md');
const spinePath = path.join(__dirname, 'progress.md');
if (fs.existsSync(spinePath)) {
  const spineContent = fs.readFileSync(spinePath, 'utf8');
  const hasDone = spineContent.includes('## Done');
  const hasInProgress = spineContent.includes('## In Progress');
  const hasBudget = spineContent.includes('## Budget');
  console.log(`   Has Done section: ${hasDone}`);
  console.log(`   Has In Progress section: ${hasInProgress}`);
  console.log(`   Has Budget section: ${hasBudget}`);
}
console.log('');

// Budget Guards
console.log('BUDGET GUARDS:');
const opencodePath = path.join(__dirname, 'opencode.json');
if (fs.existsSync(opencodePath)) {
  const opencodeContent = JSON.parse(fs.readFileSync(opencodePath, 'utf8'));
  if (opencodeContent.budget) {
    console.log(`   Max tokens per run: ${opencodeContent.budget.maxTokensPerRun}`);
    console.log(`   Max PRs per run: ${opencodeContent.budget.maxPRsPerRun}`);
    console.log(`   Max runs per day: ${opencodeContent.budget.maxRunsPerDay}`);
    console.log(`   Timeout: ${opencodeContent.budget.timeoutMinutes} minutes`);
  }
}
console.log('');

// Loop Flow
console.log('LOOP FLOW:');
console.log('   Every weekday at 9am:');
console.log('     → Read progress.md (spine)');
console.log('     → Run lint, find issues');
console.log('     → For each issue:');
console.log('         → Create branch (worktree)');
console.log('         → Draft fix (maker)');
console.log('         → Reviewer grades (checker)');
console.log('         → If PASS: open PR (connector)');
console.log('         → If FAIL: flag for human');
console.log('     → Update progress.md (spine)');
console.log('');

console.log('=== All 6 Parts Complete ===');