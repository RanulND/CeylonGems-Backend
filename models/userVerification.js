const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require ("jsonwebtoken");
// const { boolean } = require('joi');

const userVerificationSchema = new Schema({
    userId: { 
        type : String,
        
    },
    verifyEmailToken : {
        type : String,
       
    },
    createdAt : {
        type : Date,
       
    },
    verifyEmailExpire: {
        type : Date,
    }
});

const UserVerification = mongoose.model('UserVerification', userVerificationSchema,'UserVerification');
module.exports = UserVerification;