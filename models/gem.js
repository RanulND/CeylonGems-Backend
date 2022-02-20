const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gemSchema = new Schema({
    status : { 
        type : String,
        required:true
    },
    quantity : {
        type : String,
        required:true
    },
    hardness : {
        type : String,
        required:true
    },
    weight : {
        type : String,
        required:true
    },
    colour : {
        type : String,
        required:true
    },
    origin : {
        type : String,
        required:true
    },
});
const Gem = mongoose.model('Gem', gemSchema,'gem');
module.exports = Gem;