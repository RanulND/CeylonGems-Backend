const express = require('express');
const { addItemToCart, removeItemFromCart, increaseCart, decreaseCart, removeItem, getCart, clearCart } = require('../controllers/CartController');
const router = express.Router();

router.post('/addtocart', addItemToCart);
router.post('/removeFromcart', removeItemFromCart);
router.post('/increaseCart', increaseCart);
router.post('/decreaseCart', decreaseCart);
router.post('/clearItemFromCart', removeItem);
router.post('/getCart', getCart);
router.put('/clearCart', clearCart)
module.exports = router;