const Admin = require("../models/admin")
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const UserVerification = require("../models/userVerification")
const bcrypt = require("bcrypt")
const sendEmail = require("../shared/sendEmail");
const crypto = require("crypto");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses")
const passwordComplexity = require("joi-password-complexity");
const Joi = require('joi');

// const validateLoginInput = require("../../validation/login");
exports.adminSignIn = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var status = false
  Admin.findOne({ email: email }).then(admin => {
    if (admin) {
      const cmp = bcrypt.compareSync(password, admin.password);
      if (cmp) {
        status = true
        successResponse(res, 'Admin Login successful', status);
      }
      else {
        status = false
        errorResponse(res, 200, 'Invalid Password', status);
      }

    } else {
      status = false
      errorResponse(res, 200, 'Admin not found', status);
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

//user auth controller | signup 
const signupvalidate = (data) => {
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

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  return res.status(statusCode).json({ sucess: true, token });
}

//user auth controller | signin
exports.userSignIn = function (req, res) {
  const { error } = signinValidate(req.body);
  if (error)
    return res.status(400).send({ message: error.details[0].message });

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email }).then(user => {

    if (user) {
    
        // const { error} =isNotVerified(email,res);
        const cmp = bcrypt.compareSync(password, user.password);
        if (cmp) {
          return sendToken(user, 200, res);
        }
        else {
         return errorResponse(res, null, 'Invalid Password', null);
        }
      

    } else {
     return errorResponse(res, 404, 'User not found. Please Sign Up', null);
    }
  }).catch(err => {
   return errorResponse(res, null, null, err);
  });
}

exports.userSignUp = function (req, res) {

  const { error, value } = signupvalidate(req.body);

  if (error) {
    return errorResponse(res, 404, error.details[0].message, null);
  }
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var nic = req.body.nic;
  var phoneNumber = req.body.phoneNumber;
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email }).then(user => {
    if (user) {
      return errorResponse(res, 400, "Email Already exists", null);
    }
    User.findOne({ nic }).then(user => {
      if (user) {
        return errorResponse(res, 400, "NIC Already exists", null);
      } else {
        const newUser = new User({
          firstName,
          lastName,
          nic,
          phoneNumber,
          email,
          password,
          verified: false,
          roles: {
            buyer: true,
            seller: true
          }
        });

        // Hash password before saving in database
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        newUser.save().then((user) => {
          //Handle Email Account Verfication
          sendVerificationEmail(user, res);
          return sendToken(user, 200, res);
        }).catch(err => {
          console.log(err);
          return errorResponse(res, 400, 'Something went wrong', null)
        });
      }
    }).catch(err => {
      return errorResponse(res, 400, "Something went wrong.", null);
    });
  }).catch(err => {
    return errorResponse(res, 400, "Something went wrong.", null);
  });
};

//send verification email
const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const verifyToken = crypto.randomBytes(20).toString("hex");
    const verifyEmailExpire = Date.now() + 24 * 60 * (60 * 1000); //24hrs

    //set values in userVerification model
    const newUserVerification = new UserVerification({
      userId: _id,
      // Verify Email Token Gen and add to database hashed (private) version of token
      verifyEmailToken: crypto.createHash("sha256").update(verifyToken).digest("hex"),
      createdAt: Date.now(),
      verifyEmailExpire: verifyEmailExpire
    });
    await newUserVerification.save();

    // Create verification url to email for provided email
    const verifyEmailUrl = `http://localhost:3000/verifyemail/${verifyToken}`;

    // HTML Message
    const message = `
        <h1>Please verify your email address.</h1>
        <p>To verify this email address belongs to you, please use the verification link below to log in:</p>
        <a href=${verifyEmailUrl} clicktracking=off>${verifyEmailUrl}</a>`;

    try {
      await sendEmail({
        to: email,
        subject: "CeylonRuby - Email Verification",
        text: message,
      });

      return successResponse(res,
        "Verification Email Sent.Thank you for Sign Up. Please check your email to verify your account",
        null);

    } catch (err) {
      console.log(err);

      UserVerification.verifyEmailToken = undefined;
      UserVerification.verifyEmailExpire = undefined;

      await UserVerification.save();
      return errorResponse(res, 400, "Verification Email could not be sent", null);
    }
  } catch (err) {
    return errorResponse(res, 400, "Something went wrong", null);
  }
}

//Email Verification
exports.emailVerification = async (req, res, next) => {
  //Compare token in URL params to hashed token
  // verify email verification link
  const verifyEmailToken = crypto
    .createHash("sha256")
    .update(req.params.verifyToken)
    .digest("hex");

  try {
    const userVerification = await UserVerification.findOne({
      verifyEmailToken,
      verifyEmailExpire: { $gt: Date.now() },
    });

    if (!userVerification) {
      errorResponse(res, 400, "Invalid Email Verification Token");

    }

    userVerification.verifyEmailToken = undefined;
    userVerification.verifyEmailExpire = undefined;
    await userVerification.save();
    let userId = userVerification.userId;
    User.findOne({ _id: userId }).then(user => {
      user.verified = true;
      user.save();
      successResponse(res, 'User Verified', user);
    }).catch(err => console.log(err));

  } catch (err) {
    return (err);
  }
}


exports.sendVerificationEmail = async (req, res, next) => {
  var email = req.body.email;
  var id = req.body.id;
  try {
    const verifyToken = crypto.randomBytes(20).toString("hex");
    const verifyEmailExpire = Date.now() + 24 * 60 * (60 * 1000); //24hrs

    //set values in userVerification model
    const newUserVerification = new UserVerification({
      userId: id,
      // Verify Email Token Gen and add to database hashed (private) version of token
      verifyEmailToken: crypto.createHash("sha256").update(verifyToken).digest("hex"),
      createdAt: Date.now(),
      verifyEmailExpire: verifyEmailExpire
    });
    await newUserVerification.save();

    // Create verification url to email for provided email
    const verifyEmailUrl = `http://localhost:3000/verifyemail/${verifyToken}`;

    // HTML Message
    const message = `
        <h1>Please verify your email address.</h1>
        <p>To verify this email address belongs to you, please use the verification link below to log in:</p>
        <a href=${verifyEmailUrl} clicktracking=off>${verifyEmailUrl}</a>`;

    try {
      await sendEmail({
        to: email,
        subject: "CeylonRuby - Email Verification",
        text: message,
      });

      return successResponse(res,
        "Verification Email Sent.Thank you for Sign Up. Please check your email to verify your account",
        null);

    } catch (err) {
      console.log(err);

      UserVerification.verifyEmailToken = undefined;
      UserVerification.verifyEmailExpire = undefined;

      await UserVerification.save();
      return errorResponse(res, 400, "Verification Email could not be sent", null);
    }
  } catch (err) {
    return errorResponse(res, 400, "Something went wrong", null);
  }
}

//  User Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // send password link
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
    return errorResponse(res, 404, "User with given email does not Exist", null);

    }
    if (!user.verified) {
      return errorResponse(res, 404, 'Your account has not been verified. Please check your email to verify your account', null);
  
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
        subject: "CeylonRuby - Password Reset Request",
        text: message,
      });

      // res.status(200).json({ success: true, data: "Email Sent. Please check your email" });
      return successResponse(res, "Email Sent. Please check your email", null);
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      // res.status(200).json({ success: false, data: "Email could not be sent" });
     return errorResponse(res, 500, "Email could not be sent", null);

    }
  } catch (err) {
    next(err);
  }
};


// Validate reset password before saving in database
const resetPasswordvalidate = (data) => {
  const schema = Joi.object({

    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};


// User Reset User Password
exports.resetPassword = async (req, res, next) => {
  //Compare token in URL params to hashed token
  // verify password reset link
  console.log(req);
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
     return errorResponse(res, 400, "Invalid Reset Token");
    }

    //  set new password
    user.password = req.body.password;
    const { error } = resetPasswordvalidate(req.body);

    if (error) {
      return errorResponse(res, 404, error.details[0].message, null);
    }

    // Hash password before saving in database
    user.password = bcrypt.hashSync(user.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return successResponse(res, "Password Updated Successfully", null);
  } catch (err) {
    next(err);
  }
};

