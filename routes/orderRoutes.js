const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');


router.post('/addOrder', orderController.addOrder);
router.get('/getAllOrders', orderController.getAllOrders)
router.get('/order/:id', orderController.getOrder)
router.post('/getOrderByBuyer', orderController.getOrdersByBuyer)

router.post('/getorderbyid', orderController.getOrderDetails);

//Get product details
router.post('/productdetails',orderController.getProductDetails);

module.exports = router;