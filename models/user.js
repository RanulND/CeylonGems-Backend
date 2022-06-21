const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require ("jsonwebtoken");
// const { boolean } = require('joi');

const rolesSchema = new Schema({
    buyer: {
        type: Boolean,
        default: true
    },
    seller: {
        type: Boolean,
        default: true
    }
});

const userSchema = new Schema({
    firstName : { 
        type : String,
        required:true
    },
    lastName : {
        type : String,
        required:true
    },
    nic : {
        type : String,
        unique:true,
        required:true
    },
    phoneNumber : {
        type : String,
        required:true
    },
    email : {
        type : String,
        unique:true,
    },
    photos: {
        type: String
    },
    password: {
        type: String,
        required: true,
    
    },
    verified : {
      type :Boolean,
 
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: String,
    },
    resetPasswordOTP: {
        type: String,
    },
    
    roles: rolesSchema
    
});

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, ...this._doc }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordOTP = crypto.createHash("sha256").update(OTP).digest("hex");
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    return ({resetToken,OTP});
};

const User = mongoose.model('User', userSchema,'user');
module.exports = User;