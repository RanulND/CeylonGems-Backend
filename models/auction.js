const { date, string } = require('joi');
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
    curPrice: {
        type: String,
    },
    duration: {
        type: String,
        required: true
    },
    itemImage: {
        type: String,
    },

}, {timestamps: true});
const Auction = mongoose.model('Auction', auctionSchema, 'auction');
module.exports = Auction;
