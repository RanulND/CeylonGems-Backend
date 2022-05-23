const mongoose = require('mongoose')


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

const Order = mongoose.model('Order', orderSchema, 'order');
module.exports = Order;