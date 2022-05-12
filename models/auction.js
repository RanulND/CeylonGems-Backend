const { date, string } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({
  
    sellerId : {
    type : String,
    unique : true,
    required :true

    },
    title : { 
        type : String,
        required:true
    },
 
    desc : {
        type : String,
        required : true
    },
    
    curPrice : {
        type : String,
    },
    duration : {
        type : String,
        required : true
    },
    itemImage : {
        type : String,
    },
  
});
const Auction = mongoose.model('Auction', auctionSchema,'auction');
module.exports = Auction;
