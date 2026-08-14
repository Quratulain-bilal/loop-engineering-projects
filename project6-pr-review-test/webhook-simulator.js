const http = require('http');
const { execSync } = require('child_process');

// Simulate GitHub webhook events
const events = {
  'pull_request.opened': {
    action: 'opened',
    pull_request: {
      number: 1,
      title: 'Add new feature',
      head: { sha: 'abc123' }
    }
  },
  'pull_request.synchronize': {
    action: 'synchronize',
    pull_request: {
      number: 1,
      title: 'Add new feature',
      head: { sha: 'def456' }
    }
  }
};

// Webhook server
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const eventType = req.headers['x-github-event'];
        
        console.log(`\nReceived webhook: ${eventType}`);
        console.log(`Action: ${payload.action}`);
        
        // Simulate review process
        if (eventType === 'pull_request') {
          console.log('\nTriggering automated review...');
          
          // Run review simulation
          execSync('node simulate-review.js', { stdio: 'inherit' });
          
          console.log('\nReview complete. Results posted to PR.');
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Webhook simulator running on port ${PORT}`);
  console.log('\nTo simulate events:');
  console.log('1. curl -X POST -H "Content-Type: application/json" -H "X-GitHub-Event: pull_request" -d \'{"action":"opened","pull_request":{"number":1,"title":"Test PR","head":{"sha":"abc123"}}}\' http://localhost:3000');
  console.log('2. Or run: node test-webhook.js');
});

// Export for testing
module.exports = { server, events };