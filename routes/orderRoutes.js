const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.post('/addOrder', orderController.addOrder);

module.exports = router;