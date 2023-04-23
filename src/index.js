// Import express.js and cors modules
const express = require('express');
const cors = require('cors');
const rootRouter = require('./routers/rootRoute');

// Create an instance of express
const app = express();

// Use cors middleware
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use rootRouter middleware
app.use("/api", rootRouter);

// Check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start listening on the port
app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});