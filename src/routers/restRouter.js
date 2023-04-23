const express = require('express');
const restRouter = express.Router();

restRouter.get('/check', (req, res) => {
  res.send('Server is up and running!');
});

module.exports = restRouter;
