// Admin Auth router
const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AuthController');

// Admin Sign In
router.post('/admin/signin', authController.adminSignIn);

//Buyer Sign In 
router.post('/signin', authController.userSignIn);
module.exports = router;