const express = require('express');
const app = express.Router();
const POSController = require('../Controllers/POSController');
const requiredLogin = require('../middlewares/requiredLogin');

app.post('/create-customer', requiredLogin, POSController.add_user);

app.get('/find-customer/:phone', requiredLogin, POSController.get_user);

app.post('/create-a-bill', requiredLogin, POSController.create_bill);

app.get('/search-product/:barcode', requiredLogin, POSController.search_product_by_barcode);

app.get('/search-products', requiredLogin, POSController.search_products);

module.exports = app;