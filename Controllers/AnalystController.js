require('../models/OrderModel');
require('../models/OrderDetailModel');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const Customer = mongoose.model('Customer');
const User = mongoose.model('User');
const OrderDetail = mongoose.model('OrderDetail');
const package = require('../middlewares/package');
const JWT = require('jsonwebtoken');

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await fetchAllOrders(req, res);
            
            return res.send(result);
        } catch (err) {
            res.send(package(404, err.message, null));
        }
    },
    getByDay: async (req, res) => {
        try {
            const result = await fetchByDay(req, res);

            return res.send(result);
        } catch (err) {
            res.send(package(404, err.message, null));
        }
    }
};

const totalPriceOfOrder = (orders) => {
    let totalPrice = 0;
    orders.forEach((order) => {
        totalPrice += order.total;
    });
    return totalPrice;
}

const totalNumberOfProducts = (orders) => {
    let numberProducts = 0
    orders.forEach((order) => {
        numberProducts += order.quantity;
    });
    return numberProducts;
}

const calculateProfit = async (orders) => {
    try {
        let totalProfit = 0;

        for (const order of orders) {
            const orderDetail = await OrderDetail.findOne({ order_id: order._id });

            if (!orderDetail) {
                throw new Error(`Order Detail not found for Order ID: ${order._id}`);
            }

            for (const productCart of orderDetail.products) {
                const product = await Product.findOne({ barcode: productCart.barcode });

                if (!product) {
                    throw new Error(`Product not found with barcode: ${productCart.barcode}`);
                }
                const profitPerProduct = productCart.amount * (product.retail_price - product.import_price);
                totalProfit += profitPerProduct;
            }
        }

        return totalProfit;
    } catch (error) {
        console.error('Error calculating profit:', error.message);
        return null;
    }
};


const fetchByDay = async (req, res) => {
    try {

        const token = req.header('Authorization');
        const user = JWT.verify(token, process.env.SESSION_KEY);

        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        

        const dateFilter = {};
        if (startDate) {
            dateFilter.$gte = startDate;
        }
        if (endDate) {
            dateFilter.$lt = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
        }


        const orders = await Order.find({
            created_date: dateFilter,
        }).lean();

        if (!orders || orders.length === 0) {
            return package(404, 'Order list is empty', null);
        }
        const totalProfit = user.role === 'Administrator'? await calculateProfit(orders) : null;
        const totalPrice = totalPriceOfOrder(orders);
        const totalProducts = totalNumberOfProducts(orders);
        return package(0, 'Success', {
            orders,
            totalPrice,
            totalProducts,
            totalProfit: totalProfit? totalProfit : null});
    } catch (err) {
        return package(500, 'Server error', err.message);
    }
};


const fetchAllOrders = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const user = JWT.verify(token, process.env.SESSION_KEY);

        const orders = await Order.find({}).lean();
        if (!orders || orders.length === 0) {
            return package(404, 'Order list is empty', null);
        }
        const totalProfit = user.role === 'Administrator'? await calculateProfit(orders) : null;
        const totalPrice = totalPriceOfOrder(orders);
        const totalProducts = totalNumberOfProducts(orders);
        return package(0, 'Success', {
            orders, 
            totalPrice,
            totalProducts,
            totalProfit: totalProfit? totalProfit : null});
    } catch (err) {
        return package(500, 'Server error', err.message);
    }
};