// Auth router
const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controllers/AuthController');

// Login
router.get('/login', authController.login);


module.exports = router;