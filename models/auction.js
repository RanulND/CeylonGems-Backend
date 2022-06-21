const { date, string, required } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const auctionSchema = new Schema({

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required : true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
        required: true
    },
    itemImage: {
        type: String,
        require:true
    },
    winningBid: {
        type: Number,
        // required :true
    },
    


}, {timestamps: true});
const Auction = mongoose.model('Auction', auctionSchema, 'auction');
module.exports = Auction;
