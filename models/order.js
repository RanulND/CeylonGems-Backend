const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const Gem = require('./gem')
const Jewelry = require('./jewellery')

const shippingAddressSchema = new Schema({
    city: {
        type: String,
        // required: true
    },
    streetAddress: {
        type: String,
        // required: true
    },
    province: {
        type: String,
        // required: true,
    },
    country: {
        type: String,
        // required: true,
    },
    zipCode: {
        type: String,
        // required: true
    }
})

const itemList = new Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Gem || Jewelry
    },
    quantity: {
        type: Number,
        default: 1
    },

})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    itemList: [
        itemList
    ],
    orderValue: {
        type: Number,
        required: true
    },
    BuyerPaymentSuccess: {
        type: Boolean,
        default: false
    },

    shippingAddress: shippingAddressSchema,

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema, 'order');
module.exports = Order;