const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.post('/addOrder', orderController.addOrder);

router.post('/productdetails', orderController.getProductDetails);
router.get('/order/:id', orderController.getOrder);
router.post('/getorderbyid', orderController.getOrderDetails);

module.exports = router;