// Admin Auth router
const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AdminAuthController');

// Admin Sign In
router.get('/signIn', authController.signIn);

module.exports = router;