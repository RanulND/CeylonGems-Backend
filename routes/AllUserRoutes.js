const express = require('express');

const router = express.Router();
const User = require('../models/user');

//importing...
const AllUserController = require('../controllers/UserController')

router.post('/getallusers', AllUserController.getAllUsers);

module.exports = router;
