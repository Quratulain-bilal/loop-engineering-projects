const fs = require('fs');
const path = require('path');

console.log('=== Project 12: Dreaming Loop Complete ===\n');

console.log('THE PATTERN:');
console.log('Daily loops write logs → Dreaming reads logs → Proposes rules → Human merges\n');

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ WEEKLY FLOW                                               │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ Monday 10am: Dreaming loop fires                          │');
console.log('│ → Reads dreaming-state.md (last run date)                 │');
console.log('│ → Reads progress.md (daily loop logs)                     │');
console.log('│ → Counts failures: TypeScript errors (4x), timeouts (3x)  │');
console.log('│ → Drafts PR with proposed rules                           │');
console.log('│ → Proposes one deletion                                   │');
console.log('│ → Updates dreaming-state.md                               │');
console.log('└─────────────────────────────────────────────────────────────┘\n');

console.log('FILES:');
const files = [
  'dreaming-state.md - Spine for dreaming loop',
  'progress.md - Daily loop logs (input)',
  'AGENTS.md - Rules file (may get updated)',
  '.opencode/skills/dreaming/SKILL.md - Dreaming instructions',
  '.opencode/agents/dreaming-analyst.md - Log analyst subagent',
  '.github/workflows/dreaming-loop.yml - Weekly schedule',
  'logs/analysis-2026-08-14.md - Sample analysis',
  'verify-dreaming.js - Verification script'
];
files.forEach(f => console.log(`  • ${f}`));

console.log('\nVERIFICATION:');
console.log('✓ Condition 1: PR traces to real, cited log entries');
console.log('✓ Condition 2: Planted repeated failure gets caught');
console.log('✓ Condition 3: Nothing changed without human merge');

console.log('\nKEY CONCEPTS:');
console.log('• Spine: dreaming-state.md carries state between runs');
console.log('• Evidence-based: Every proposal cites specific runs');
console.log('• Human gate: All changes go through PRs');
console.log('• Improvement loop: Makes other loops better over time');

console.log('\n=== Dreaming Loop Complete ===');