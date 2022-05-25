// Auth router
const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AuthController');
const { protect } = require("../middleware/auth");

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

//send verify email
 router.post('/verifyuseremail',authController.sendVerificationEmail);

//User Email Verification
router.post('/verifyuseremail/:verifyToken',authController.emailVerification);

module.exports = router;
