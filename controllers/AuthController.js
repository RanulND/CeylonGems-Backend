const Admin = require("../models/admin")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const sendEmail = require ("../shared/sendEmail");
const crypto = require("crypto");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses")
const passwordComplexity = require("joi-password-complexity");
const Joi = require('joi');
const jwt = require('jsonwebtoken')
// const validateLoginInput = require("../../validation/login");
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
//signIn Validation part

const signinValidate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, 'CeylonRuby123', {
    expiresIn: '30d',
  })
}
//user auth controller | signin

exports.userSignIn = function (req, res) {
    const { error } = signinValidate(req.body);
    if (error)
			return res.status(400).send({ message: error.details[0].message });

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email:email }).then(user => {
        if(user){
            const cmp = bcrypt.compareSync(password, user.password);
            if(cmp){
              res.json({
                email: user.email,
                name: user.firstName,
                _id: user.id,
                token: generateToken(user._id)
              })
                // successResponse(res.json({token: generateToken(user._id)}), 'User Login successful', user);
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
//signUp validation

//user auth controller | signup 

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
        nic: Joi.string().required().label("NIC"),
        phoneNumber: Joi.string().required().label("Phone Number"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

//user auth controller | signup 

exports.userSignUp=function(req, res){

const { error } = validate(req.body);

if (error){
 return errorResponse(res, 404,error.details[0], null);
}

const {firstName, lastName, nic, phoneNumber,email,password } = req.body;
 
  User.findOne({email}).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email or NIC already exists" });
      }else{
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



  //  User Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new errorResponse("No email could not be sent", 404));
      }
  
      // Reset Token Gen and add to database hashed (private) version of token
      const resetToken = user.getResetPasswordToken();
  
      await user.save();
  
      // Create reset url to email to provided email
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
  
      // HTML Message
      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;
  
      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
  
        res.status(200).json({ success: true, data: "Email Sent" });
      } catch (err) {
        console.log(err);
  
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        return next(new errorResponse("Email could not be sent", 500));
      }
    } catch (err) {
      next(err);
    }
  };
  
  // User Reset User Password
  exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return next(new errorResponse("Invalid Reset Token", 400));
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedJwtToken(),
      });
    } catch (err) {
      next(err);
    }
  };
  
  const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };
