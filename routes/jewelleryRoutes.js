// Product router
const app = require('express');
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');

//Jewellery add
router.post('/add', productController.jewelleryAdd);
// Edit jewel details
router.put('/edit/:detailId',productController.updateJewellery);
//delete jewel
router.delete('/delete/:detailId', productController.deleteJewel);

// router.get('/:id', productController.getJewelryProduct);
router.get('/all-jewellery', productController.getAllJewelry);
router.post('/get-jewellery', productController.getJewelleryDetails);
router.get('/seller-products/:seller_id', productController.getSellerJewelleriesProfile);
router.get('/:id', productController.getJewelryProduct);
router.get('get-count/:seller_id',productController.getJwlCount)
module.exports = router;




