const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.get('/test/route/file.json', (req, res) => {
  res.json({ message: 'This is the /test/route/file.json endpoint' });
});

// Catch-all route to handle other requests
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Export the Express app
module.exports = app;

