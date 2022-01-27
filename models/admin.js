const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    firstName : { 
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    adminLevel : {
        type : Number
    },
    nic : {
        type : String
    },
    phone : {
        type : String
    }
});

const Admin = mongoose.model('Admin', adminSchema, 'admin');
module.exports = Admin;