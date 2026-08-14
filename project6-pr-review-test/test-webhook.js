const http = require('http');

// Test webhook events
const testEvents = [
  {
    name: 'PR Opened',
    event: 'pull_request',
    payload: {
      action: 'opened',
      pull_request: {
        number: 1,
        title: 'Add new feature',
        head: { sha: 'abc123' }
      }
    }
  },
  {
    name: 'PR Synchronized (code push)',
    event: 'pull_request',
    payload: {
      action: 'synchronize',
      pull_request: {
        number: 1,
        title: 'Add new feature',
        head: { sha: 'def456' }
      }
    }
  }
];

// Send test webhook
function sendWebhook(testEvent) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(testEvent.payload);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': testEvent.event,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`\n${testEvent.name} response: ${res.statusCode}`);
        console.log(`Response: ${data}`);
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.error(`Error sending ${testEvent.name}:`, error);
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('=== Testing Webhook Events ===\n');
  
  for (const testEvent of testEvents) {
    console.log(`\nSending: ${testEvent.name}`);
    await sendWebhook(testEvent);
    
    // Wait a bit between events
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n=== All Tests Complete ===');
}

// Run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { sendWebhook, testEvents };