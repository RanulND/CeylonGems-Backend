const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const gemSchema = new Schema({
    status: {
        type: Boolean,
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    photos: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    hardness: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    origin: {
        type: String,
    },
    quantity: {
        type: Number,
        require: true
    },
    gem_certificate: {
        type: String,
    },
    format: {
        type: String,
        required: true
    },
    base_value: {
        type: Number,
    },
    auc_duration: {
        type: Number,
    },
    product: {
        type: String,
    },
    verified: {
        type: Boolean
    }
  

});
const Gem = mongoose.model('Gem', gemSchema, 'gem');
module.exports = Gem;