// Product router
const app = require('express');
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');

//Jewellery add
router.post('/add', productController.jewelleryAdd);
// Edit gem details
router.put('/edit/:detailId',productController.updateJewellery);

// router.get('/:id', productController.getJewelryProduct);
router.get('/all-jewellery',productController.getAllJewelry);
router.post('/get-jewellery', productController.getJewelleryDetails);

module.exports = router;




