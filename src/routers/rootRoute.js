// Importing the necessary modules
const express = require('express');
const restRouter = require('./restRouter');
const userRouter = require('./userRoute');
const rootRouter = express.Router();

// Root route
rootRouter.use('/user', userRouter);
rootRouter.use('/rest', restRouter);

// Exporting the router
module.exports = rootRouter;

