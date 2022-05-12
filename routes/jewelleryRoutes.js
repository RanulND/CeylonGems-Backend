// Product router
const app = require('express');
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');

//Jewellery add
router.post('/add', productController.jewelleryAdd);
// Edit gem details
router.put('/edit',productController.updateJewellery);

// module.exports = router;

 const express = require('express');

//const router = express.Router();
const Jewellery = require('../models/jewellery');

//importing...
const GetJewelleryController = require('../controllers/ProductController')

router.post('/', GetJewelleryController.getJewelleryDetails);

module.exports = router;
