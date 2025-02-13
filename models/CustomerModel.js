const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    phone: {
        type: String, 
        required: true,
        unique: true,
    },
    address: {
        type: String, 
        required: true,
    },
    email:{
        type: String, 
        required: false,
    },
    image:{
        type: String, 
        required: true,
        default: 'https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png?alt=media&token=3b571e00-a007-497c-93d3-af8060dde22d&_gl=1*10aed1t*_ga*NzkyMjQ3NDYxLjE2OTY5MjkyODU.*_ga_CW55HF8NVT*MTY5NjkyOTI4NS4xLjEuMTY5NjkyOTYyNC41MS4wLjA.'
    },
    creation_date:{
        type: Date, 
        required: true,
        default: Date.now,
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;



