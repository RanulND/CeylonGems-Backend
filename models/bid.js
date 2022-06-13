const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Auction = require('./auction')
const User = require('./user')


const bidSchema = new Schema({

    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Auction,
        required: true
    },
    bidValue: {
        type: Number,
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },

},{ timestamps: true });

const Bid = mongoose.model('Bid', bidSchema, 'bid');
module.exports = Bid;
