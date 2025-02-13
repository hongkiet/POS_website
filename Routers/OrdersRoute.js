const express = require('express');
const app = express.Router();
const OrdersController = require('../Controllers/OrdersController');
const requiredLogin = require('../middlewares/requiredLogin');

app.get('/:order_number', requiredLogin, OrdersController.get);
app.get('/', requiredLogin, OrdersController.index);

module.exports = app;
