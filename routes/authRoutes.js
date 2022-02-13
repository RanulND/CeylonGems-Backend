// Admin Auth router
const app = require('express');
const { body, check } = require('express-validator');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AuthController');

// Admin Sign In
router.post('/admin/signin', authController.adminSignIn);


//User Sign In 
router.post('/signin', authController.userSignIn);

//User Sign Up
router.post('/signup',[check('email','email is not valid').isEmail(),check('firstName','name cannot be empty').notEmpty()], authController.userSignUp);


module.exports = router;