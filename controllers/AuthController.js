const Admin = require("../models/admin")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { ackResponse, errorResponse, successResponse } = require("../shared/responses")

exports.adminSignIn = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    Admin.findOne({ email:email }).then(admin => {
        if(admin){
            const cmp = bcrypt.compareSync(password, admin.password);
            if(cmp){
                successResponse(res, 'Admin Login successful', admin);
            }
            else{
                errorResponse(res, null, 'Invalid Password', null);
            }
            
        }else{
            errorResponse(res, 404, 'Admin not found', null);
        }
    }).catch(err => {
        errorResponse(res, null, null, err);
    });
}

//user auth controller | signin

exports.userSignIn = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email:email }).then(user => {
        if(user){
            const cmp = bcrypt.compareSync(password, user.password);
            if(cmp){
                successResponse(res, 'User Login successful', user);
            }
            else{
                errorResponse(res, null, 'Invalid Password', null);
            }
            
        }else{
            errorResponse(res, 404, 'User not found', null);
        }
    }).catch(err => {
        errorResponse(res, null, null, err);
    });
}

//user auth controller | signup

exports.userSignUp = async(req,res) =>{
    const {firstName, lastName, nic, phoneNumber,email,password } = req.body;

    try{
        const user = User.create({
            firstName,lastName,nic,phoneNumber,email,password
        });

        successResponse(res, 'User Sign Up successful', user);
    }catch(error){
        errorResponse(res, null, null, err);
    }

}

