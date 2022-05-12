const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema =  {

}

const Auction = mongoose.model('Auction', auctionSchema, 'auction' )
module.exports = Auction