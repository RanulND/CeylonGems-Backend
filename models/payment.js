const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Order = require('./order')

const paymentSchema = new Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    amount: {
        type : Number,
    },
    isSuccess: {
        type :Boolean,
    },
   
 
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema, 'payment');
module.exports = Payment;