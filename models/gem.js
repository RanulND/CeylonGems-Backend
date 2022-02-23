const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gemSchema = new Schema({
    status : { 
        type : Boolean,
        required:true
    },
    title : { 
        type : String,
        required:true
    },
    category : { 
        type : String,
        required:true
    },
    photos : {
        type : Array,
        required : true
    },
    description : { 
        type : String,
        required:true
    },
    size : {
        type : String,
        required:true
    },
    weight : {
        type : String,
        required:true
    },
    hardness : {
        type : String,
        required:true
    },
    colour : {
        type : String,
        required:true
    },
    origin : {
        type : String,
    },
    quantity : {
        type : Number,
        require : true
    },
    gem_certificate : {
        type : String,
    },
    format : {
        type : String,
        required : true
    },
    base_value : {
        type : Number,
        required:true
    },
    auc_duration : {
        type : Number,
        required:true
    },
});
const Gem = mongoose.model('Gem', gemSchema,'gem');
module.exports = Gem;