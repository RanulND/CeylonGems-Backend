const Admin = require("../models/admin")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { ackResponse, errorResponse, successResponse } = require("../shared/responses")
const jwt = require("jsonwebtoken")
const accessTokenSecret = 'youraccesstokensecret'

// Load input validation
const validateRegisterInput = require("../validation/signUp");
// const validateLoginInput = require("../../validation/login");

exports.adminSignIn = function (req, res) {
    var { email, password } = req.body

    Admin.findOne({ email: email }).then(admin => {
        if (admin) {
            const cmp = bcrypt.compareSync(password, admin.password);
            if (cmp) {
                const token = jwt.sign({email: admin.email, nic: admin.nic},accessTokenSecret, {expiresIn: "5min"})
                // localStorage.setItem('token', token)
                console.log(token)
                const adminData = {
                    name : admin.firstName + ' ' + admin.lastName,
                    email: admin.email,
                    token: token,
                    nic : admin.nic
                }
                successResponse(res, 'Admin Login successful',adminData);

            }
            else {
                errorResponse(res, null, 'Invalid Password', null);
            }
        } else {
            errorResponse(res, 404, 'Admin not found', null);
        }
    }).catch(err => {
        errorResponse(res, null, null, err);
    });
}

//user auth controller | signin
exports.userSignIn = function (req, res) {
    var { email, password } = req.body

    User.findOne({ email: email }).then(user => {
        if (user) {
            const cmp = bcrypt.compareSync(password, user.password);
            if (cmp) {
                successResponse(res, 'User Login successful', user);
            }
            else {
                errorResponse(res, null, 'Invalid Password', null);
            }
        } else {
            errorResponse(res, 404, 'User not found', null);
        }
    }).catch(err => {
        errorResponse(res, null, null, err);
    });
}

//user auth controller | signup

// exports.userSignUp = async(req,res) =>{
// const {firstName, lastName, nic, phoneNumber,email,password } = req.body;

//     try{
//         const user = User.create({
//             firstName,lastName,nic,phoneNumber,email,password
//         });

//         successResponse(res, 'User Sign Up successful', user);
//     }catch(error){
//         errorResponse(res, null, null, err);
//     }

// }

//user auth controller | signup 2
exports.userSignUp = function (req, res) {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { firstName, lastName, nic, phoneNumber, email, password } = req.body;

    User.findOne({ email } || { nic }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email or NIC already exists" });
        } else {
            const newUser = new User({
                firstName,
                lastName,
                nic,
                phoneNumber,
                email,
                password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
};
