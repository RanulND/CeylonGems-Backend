const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    firstName : { 
        type : String
    },
    lastName : {
        type : String
    },
    nic : {
        type : String,
        unique:true
    },
    phoneNumber : {
        type : String
    },
    email : {
        type : String,
        unique:true
    },
    password : {
        type : String
    },
});

//middelware for user 
userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next();
    }
      const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

})
const User = mongoose.model('User', userSchema,'user');
module.exports = User;