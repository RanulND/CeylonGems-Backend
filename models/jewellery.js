const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jewellerySchema = new Schema({
    status : { 
        type : Boolean,
    },
    title : { 
        type : String,
        required:true
    },
    photos : {
        type : String,
        required : true
    },
    description : { 
        type : String,
        required:true
    },
    purity : {
        type : Number,
        required:true
    },
    quantity : {
        type : Number,
        required:true
    },
    price : {
        type : Number,
    },
    
    product : {
        type : String,
    }
});
const Jewellery = mongoose.model('Jewellery', jewellerySchema,'jewellery');
module.exports = Jewellery;