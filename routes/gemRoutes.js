// Product router
const app = require('express');
const { required } = require('joi');
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');

// Gem add
router.post('/add', productController.gemAdd);
//Get gem type
router.post('/type', productController.gemType);
router.get('/get/gem-type', productController.getGemType);
// Edit gem details
router.put('/edit/:detailId', productController.updateGem);
//Get product details
router.get('/details/:detailId', productController.getProductDetails);
//deleteGem
router.delete('/delete/:detailId', productController.deleteGem);

//get all gems
router.get('/auction',productController.getAllAuctionGems);
router.get('/direct',productController.getAllDirectGems);
router.get('/home-gems1',productController.getThreeAuctionGems);
router.get('/home-gems2',productController.getThreeDirectGems);
router.get('/home-gems3',productController.getThreeJewellery);
router.get('/seller-products/:seller_id',productController.getSellerGems)
router.post('/gem-count-by-id', productController.gemCountBySeller)
router.post('/sellergems', productController.getSellerGemsProfile);
router.get('/:id', productController.getGemProduct);
module.exports = router;
