require('../models/OrderModel');
require('../models/OrderDetailModel');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Customer = mongoose.model('Customer');
const User = mongoose.model('User');
const OrderDetail = mongoose.model('OrderDetail');
const package = require('../middlewares/package');

module.exports = {
    index: async (req, res) => {
        try{
            const result = await fetchOrderList(req, res);
            return res.send(result);
        }
        catch(err){
            res.send(
                package(404, err.message, null)
            )
        }
    },
    get: async (req, res) =>{
        try{
            const order_number = req.params.order_number;
            const result = await findOrderDetail(order_number);
            return res.send(result);
        }
        catch(err){
            res.send(
                package(404, err.message, null)
            )
        }
    },


}

// Sub function
const findOrderDetail = async (order_number) => {
    try{
        const order = await Order.findOne({order_number});

        if(!order){
            return package(404, 'Order does not exist in the system', null);
        }

        const {customer_id, staff_id} = order;

        const customerDB = await Customer.findOne({_id: customer_id});
        const customer = {...customerDB._doc};
        delete customer.password;


        if(!customerDB){
            return package(404, 'Customer does not exist in the system', null);
        }

        const staffDB = await User.findOne({_id: staff_id});
        if(!staffDB){
            return package(404, 'Staff does not exist in the system', null);
        }

        const staff = {...staffDB._doc};
        delete staff.password;
        delete staff.image;
        delete staff.status;

        // console.log(staff);


        const orderDetail = await OrderDetail.findOne({order_number});
        if(!orderDetail){
            return package(404, 'Order detail does not exist in the system', null);
        }

        const endOrder = {
            order: order,
            customer: customer,
            staff: staff,
            orderDetail: orderDetail,
        }
        return package(0, 'Success', endOrder);
    }catch(err){
        return package(500, 'Server error', err.message);
    }
}

const fetchOrderList = async (req, res) =>{
    try{ 
        const pageSize = 10; 
        const pageNumber = parseInt(req.query.page, 10) || 1;
          const skipAmount = (pageNumber - 1) * pageSize;

        const totalOrders = await Order.countDocuments({});
        const totalPages = Math.ceil(totalOrders / pageSize);

        const orders = await Order.find({}).skip(skipAmount).limit(pageSize).lean();
        if(!orders){
            return package(404, 'Order list is empty', null);
        }

        const data = {
            orders,
            divider: totalPages,
        }
        return package(0, 'Success', data);
    }catch(err){
        return package(500, 'Server error', err.message);
    }
}
