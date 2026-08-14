// Main entry point
const { calculateAverage, findMax } = require('./utils');

// TODO: fix lint - unused variable
const unusedVariable = 'hello';

function main() {
  const numbers = [1, 2, 3, 4, 5];
  
  // FIXME: lint - missing const
  var result = calculateAverage(numbers);
  
  console.log('Average:', result);
  console.log('Max:', findMax(numbers));
}

// TODO: fix lint - missing semicolon
main()