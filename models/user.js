const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName : { 
        type : String
    },
    lastName : {
        type : String
    },
    nic : {
        type : String
    },
    phoneNumber : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
});

const User = mongoose.model('User', userSchema,'user');
module.exports = User;