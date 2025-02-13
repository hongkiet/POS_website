const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    barcode: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
    },
    quantity:{
        type: Number, 
        required: true,
    },
    description: {
        type: String, 
    },
    import_price: {
        type: Number, 
        required: true,
    },
    retail_price: {
        type: Number, 
        required: true,
    },
    image: {
        type: String, 
        required: true,
    },
    category: {
        type: String, 
        required: true,
    },
    creation_date: {
        type: Date, 
        required: false,
    },
    purchase: {
        type: Boolean, 
        required: true,
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
