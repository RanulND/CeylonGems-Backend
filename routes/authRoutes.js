// Admin Auth router
const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AdminAuthController');

// Admin Sign In
router.post('/AdminSignIn', authController.adminSignIn);

module.exports = router;