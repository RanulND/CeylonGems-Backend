const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

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
        required:true
    },
    password : {
        type : String,
        required:true
    },
});

//middelware for user 
// userSchema.pre("save",async function(){
//     if(!this.isModified("password")){
//         next();
//     }
//       const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })
const User = mongoose.model('User', userSchema,'user');
module.exports = User;