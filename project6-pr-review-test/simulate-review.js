const fs = require('fs');
const path = require('path');

// Simulate PR review process
console.log('=== PR Review Simulation ===\n');

// Read the code file
const codePath = path.join(__dirname, 'src', 'utils.js');
const code = fs.readFileSync(codePath, 'utf8');

console.log('Analyzing code for bugs...\n');

const issues = [];

// Check for off-by-one errors
if (code.includes('i <= numbers.length')) {
  issues.push({
    type: 'Off-by-one error',
    file: 'src/utils.js',
    line: 'calculateAverage function',
    description: 'Loop uses i <= numbers.length instead of i < numbers.length',
    severity: 'high'
  });
}

// Check for missing null checks
if (code.includes('arr[i] === value') && !code.includes('if.*null') && !code.includes('if.*undefined')) {
  issues.push({
    type: 'Missing null check',
    file: 'src/utils.js',
    line: 'includes function',
    description: 'Value parameter not checked for null/undefined before comparison',
    severity: 'medium'
  });
}

// Check for array bounds
if (code.includes('for (let i = 0; i <= numbers.length; i++)')) {
  issues.push({
    type: 'Array bounds error',
    file: 'src/utils.js',
    line: 'calculateAverage function',
    description: 'Array access will go out of bounds at i = numbers.length',
    severity: 'high'
  });
}

if (issues.length > 0) {
  console.log('ISSUES FOUND:');
  console.log('=============\n');
  
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.type}`);
    console.log(`   File: ${issue.file}`);
    console.log(`   Location: ${issue.line}`);
    console.log(`   Description: ${issue.description}`);
    console.log(`   Severity: ${issue.severity.toUpperCase()}`);
    console.log('');
  });
  
  console.log(`Total issues found: ${issues.length}`);
  console.log('\nRecommendation: Fix these issues before merging.');
} else {
  console.log('No issues found. Code looks good!');
}

console.log('\n=== Review Complete ===');