const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductCartSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    barcode: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
    },
    amount:{
        type: Number, 
        required: true,
    },
    retail_price: {
        type: Number, 
        required: true,
    },
});

const ProductCart = mongoose.model('ProductCart', ProductCartSchema);

{}