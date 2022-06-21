const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require ("jsonwebtoken");

const adminSchema = new Schema({
    firstName : { 
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String
    },
    adminLevel : {
        type : Number
    },
    nic : {
        type : String,
        required: true,
        unique: true
    },
    phone : {
        type : String
    }
});

adminSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, ...this._doc }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

const Admin = mongoose.model('Admin', adminSchema, 'admin');
module.exports = Admin;