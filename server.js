const express = require('express');
const path = require('path');
const app = express();
const port = 8888;

// Serve static files from the 'dist' directory (created by Parcel)
app.use(express.static(path.join(__dirname, 'dist'))); 

// Catch-all route for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
