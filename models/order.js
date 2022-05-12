const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = {

}

const Order = mongoose.model('Order', orderSchema, 'order');
module.exports = Order;