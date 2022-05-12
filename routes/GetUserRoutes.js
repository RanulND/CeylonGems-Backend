const express = require('express');



const router = express.Router();
const User = require('../models/user');

//importing...
const GetUserController = require('../controllers/UserController')

router.post('/getuser', GetUserController.getUserDetails);

module.exports = router;