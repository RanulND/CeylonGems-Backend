const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require ("jsonwebtoken");
//const { bool } = require('joi');
// const { boolean } = require('joi');

const userSchema = new Schema({
    firstName : { 
        type : String,
        // required:true
    },
    lastName : {
        type : String,
        // required:true
    },
    nic : {
        type : String,
        unique:true,
        // required:true
    },
    phoneNumber : {
        type : String,
        // required:true
    },
    email : {
        type : String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true,
    
    },
    verified : {
      type :Boolean,
     
  },
  
   
    resetPasswordToken: String,
  resetPasswordExpire: Date,
 
    // roles : [
    //     {
    //         seller : {
    //             type : Boolean
    //         }
    //     },
    //     {
    //         buyer : {
    //             type : Boolean
    //         }  
    //     },
    //     {
    //         admin : {
    //             type : Boolean
    //         }
    //     }
    // ]
    
    
});

//middelware for user 
// userSchema.pre("save",async function(){
//     if(!this.isModified("password")){
//         next();
//     }
//       const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };



userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    return resetToken;
};


const User = mongoose.model('User', userSchema,'user');
module.exports = User;