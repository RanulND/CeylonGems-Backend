const express = require('express');
const router = express.Router();
const User = require('../models/user');

//importing Seller Controller
const sellerController = require('../controllers/UserController')

router.post('/profile', sellerController.viewsellerprofile);

module.exports = router;




