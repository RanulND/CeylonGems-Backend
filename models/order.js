const mongoose = require('mongoose')
<<<<<<< HEAD
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

    shippingAddress: shippingAddressSchema,

}, { timestamps: true });
=======


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemList: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Gem' || 'Jewellery'
            },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ],
        country: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String
        },
        streetAddress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        orderValue: {
            type: String,
            required: true
        }

    }, { timestamps: true });
>>>>>>> origin/dev

const Order = mongoose.model('Order', orderSchema, 'order');
module.exports = Order;