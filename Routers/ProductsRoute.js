const express = require('express');
const app = express.Router();
const ProductsController = require('../Controllers/ProductsController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const requiredLogin = require('../middlewares/requiredLogin');


app.get('/', requiredLogin, ProductsController.index);
app.post('/add', requiredLogin, upload.single("image"), ProductsController.add);

app.get('/:barcode', requiredLogin, ProductsController.get);
app.patch('/:barcode', requiredLogin, ProductsController.update);
app.put('/:barcode', requiredLogin, ProductsController.edit);
app.delete('/:barcode', requiredLogin, ProductsController.delete);

module.exports = app;