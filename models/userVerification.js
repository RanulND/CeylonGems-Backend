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
    },
   
//     verified : {
//       type :boolean,
//       default: false
//   },
  
   
  
 
});
// userVerificationSchema.methods.getSignedJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRE,
//     });
//   };

//    userVerificationSchema.methods.getVerifyEmailToken = function () {
//     const verifyToken = crypto.randomBytes(20).toString("hex");
  
//     // Hash token (private key) and save to database
//     this.verifyEmailToken = crypto
//       .createHash("sha256")
//       .update(verifyToken)
//       .digest("hex");
  
    
  
//     return verifyToken;
//   };
//   userVerificationSchema.methods.getVerifyEmailTokenExpire = function (){

//     // Set token expire date //(this.)
//    this.verifyEmailExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
//     return verifyEmailExpire;
//   };

const UserVerification = mongoose.model('UserVerification', userVerificationSchema,'UserVerification');
module.exports = UserVerification;