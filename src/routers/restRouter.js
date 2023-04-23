const express = require('express');
const { orderFoodfromUser } = require('../controllers/restController');
const restRouter = express.Router();

restRouter.get('/order', orderFoodfromUser);

module.exports = restRouter;
