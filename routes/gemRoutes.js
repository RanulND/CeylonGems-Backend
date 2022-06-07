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
// Edit gem details
router.put('/edit',productController.updateGem);
//Get product details
router.post('/details/:detailId',productController.getProductDetails);

//get all gems
router.get('/auction',productController.getAllAuctionGems);
router.get('/direct',productController.getAllDirectGems);
router.get('/home-gems1',productController.getThreeAuctionGems);
router.get('/home-gems2',productController.getThreeDirectGems);
router.get('/home-gems3',productController.getThreeJewellery);
router.get('/seller-products/:seller_id',productController.getSellerGems)
router.post('/gem-count-by-id', productController.gemCountBySeller)
router.get('/:id', productController.getGemProduct);

module.exports = router;
