const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gemTypeSchema = new Schema({
    types : { 
        type : Array,
        required:true
    },
});
const GemType = mongoose.model('GemType', gemTypeSchema,'gemType');
module.exports = GemType;