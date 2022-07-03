const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.post('/addOrder', orderController.addOrder);
router.get('/getAllOrders', orderController.getAllOrders)
router.get('/order/:id', orderController.getOrder)
router.post('/getOrderByBuyer', orderController.getOrdersByBuyer)
// router.get('/getOrdersByDate', orderController.getOrdersByDate)
router.get('/payments-to-seller', orderController.getOrdersToPaySeller);
router.post('/product-details',orderController.getProductDetailsAdmin)
module.exports = router;