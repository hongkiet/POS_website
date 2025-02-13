const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');


require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the mongoose server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{

    console.log('Connected to MongoDB');

}).catch((err)=>{

    console.log(err);
    
});

// Models
require('./models/UserModel');
require('./models/CustomerModel');
require('./models/ProductCartModel');
require('./models/OrderModel');
require('./models/OrderDetailModel');
// Middleware


// Assign the Routers
app.use('/api/account', require('./Routers/AccountRoute'));
app.use('/api/users', require('./Routers/UsersRoute'));
app.use('/api/products', require('./Routers/ProductsRoute'));
app.use('/api/customers', require('./Routers/CustomersRoute'));
app.use('/api/orders', require('./Routers/OrdersRoute'));
app.use('/api/orders-analyst', require('./Routers/AnalystRoute'));
app.use('/api/pos', require('./Routers/POSRoute'));


if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.use("/", express.static(path.join(__dirname, "client", "build")));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});