const express = require('express');
const app = express.Router();
const AnalystController = require('../Controllers/AnalystController');
const requiredLogin = require('../middlewares/requiredLogin');

app.get('/allOrders', requiredLogin, AnalystController.getAll);

app.get('/byDay', requiredLogin, AnalystController.getByDay);

module.exports = app;
