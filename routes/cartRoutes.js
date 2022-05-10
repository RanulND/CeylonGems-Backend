const express = require('express');
const { addItemToCart } = require('../controllers/CartController');
const router = express.Router();

router.post('/addtocart', addItemToCart);

module.exports = router;