const fs = require('fs');
const path = require('path');

console.log('=== Project 11: Two-Routine Gate Demo ===\n');

console.log('THE PATTERN:');
console.log('Routine A drafts → Human reviews → Human fires Routine B\n');

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ STEP 1: Routine A runs (one-off schedule)                 │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ • Creates a claude/ branch with draft                     │');
console.log('│ • Updates progress.md                                     │');
console.log('│ • Does NOT merge or ship anything                         │');
console.log('│ • Human reviews the draft                                 │');
console.log('└─────────────────────────────────────────────────────────────┘\n');

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ STEP 2: Human reviews                                     │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ • Read the draft on the claude/ branch                    │');
console.log('│ • Decide: approve or reject                               │');
console.log('│ • If approved: fire Routine B                             │');
console.log('│ • If rejected: update progress.md, stop                   │');
console.log('└─────────────────────────────────────────────────────────────┘\n');

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ STEP 3: Human fires Routine B (API call)                  │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ curl -X POST https://api.anthropic.com/v1/claude_code/    │');
console.log('│   routines/<routine-id>/fire \\                            │');
console.log('│   -H "Authorization: Bearer <token>" \\                   │');
console.log('│   -H "Content-Type: application/json" \\                  │');
console.log('│   -d \'{"text": "Approved draft. Execute now."}\'          │');
console.log('│                                                           │');
console.log('│ • Routine B runs ONLY because you fired it                │');
console.log('│ • Performs the action (posts summary, etc.)               │');
console.log('│ • Updates progress.md                                     │');
console.log('└─────────────────────────────────────────────────────────────┘\n');

console.log('WHY THIS MATTERS:');
console.log('• Routine A cannot ship code (only drafts)');
console.log('• Routine B cannot run on its own (needs API fire)');
console.log('• Human decides what gets shipped');
console.log('• Human is the gate between draft and action\n');

console.log('FILES:');
const files = [
  'routines/routine-a-drafter.md - Drafts the work',
  'routines/routine-b-executor.md - Executes when fired',
  'checklist-a6.md - A6 verification checklist',
  'progress.md - State file (spine)',
  'demo-gate.js - This demo'
];
files.forEach(f => console.log(`  • ${f}`));

console.log('\n=== Gate Pattern Complete ===');