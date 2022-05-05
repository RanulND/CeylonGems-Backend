// Product router
const app = require('express');
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');
const gemController = require('../controllers/GemController')
//Jewellery add
router.post('/add', productController.jewelleryAdd);
// Edit gem details
router.put('/edit',productController.updateJewellery);

router.get('/:id', gemController.getJewelryProduct);

module.exports = router;