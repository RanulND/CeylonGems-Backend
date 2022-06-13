const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Order = require('./order')

const paymentSchema = new Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Order,
    },
    paymentId: {
        type : String,
    },
    amount: {
        type : Number,
    },
    currency: {
        type : String,
    },
    method: {
        type : String,
    },
    statusMessage: {
        type : String,
    },
   
 
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema, 'payment');
module.exports = Payment;