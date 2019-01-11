const express = require('express')
const app = express();
const path = require('path');

console.log('process.env.NODE_ENV---',process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production' || 1) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(3030, () => console.log('Server running on port 3030'))
