const mongoose = require('mongoose');

// Define the User
const UserSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
        unique: true
    },
    name: {
        type: 'string',
        required: true
    },
    email: { 
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    image:{
        type: 'string',
        required: true,
        default: 'https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png?alt=media&token=3b571e00-a007-497c-93d3-af8060dde22d&_gl=1*10aed1t*_ga*NzkyMjQ3NDYxLjE2OTY5MjkyODU.*_ga_CW55HF8NVT*MTY5NjkyOTI4NS4xLjEuMTY5NjkyOTYyNC41MS4wLjA.'
    },
    role:{
        type: 'string',
        required: true
    },
    status:{
        type: 'string',
        required: true
    },
});

// Export the model
const User = mongoose.model('User', UserSchema);

module.exports = User;