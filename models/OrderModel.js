const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    staff_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order_number:{
        type: String,
        required: true,
        unique: true,
    },
    taxrate:{
        type: Number, 
        required: true,
    },
    taxfee:{
        type: Number,
        required: true,
    },
    sub_total:{
        type: Number, 
        required: true,
    },
    cash:{
        type: Number,
        required: false,
    },
    change:{
        type: Number,
        required: false,
    },
    total:{
        type: Number, 
        required: true,
    },
    quantity: {
        type: Number, 
        required: true,
    },
    paymentMethod: {
        type: Number, 
        required: true,
    },
    created_date: {
        type: Date, 
        required: true,
    },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;