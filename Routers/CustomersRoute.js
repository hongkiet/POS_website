const express = require('express');
const app = express.Router();
const CustomersController = require('../Controllers/CustomersController');
const requiredLogin = require('../middlewares/requiredLogin');

app.get('/', requiredLogin, CustomersController.index);

app.get('/:id', requiredLogin, CustomersController.get);

app.get('/:id/transactions', requiredLogin, CustomersController.getTransactions);

module.exports = app;