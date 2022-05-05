// Auth router
const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AuthController');

// Admin Sign In
router.post('/admin/signin', authController.adminSignIn);


//User Sign In 
router.post('/signin', authController.userSignIn);

//User Sign Up
router.post('/signup', authController.userSignUp);

//User forget Password
router.post('/forgotpassword',authController.forgotPassword);

//User reset Password
router.put('/resetpassword/:resetToken',authController.resetPassword);

//Register User
router.put('/signup/register/:userId',authController.registerUser);

//Get User Details
router.post('/signup/details/:userId',authController.getUserDetails);

module.exports = router;