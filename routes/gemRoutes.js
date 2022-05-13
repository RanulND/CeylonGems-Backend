// Product router
const app = require('express');
const { required } = require('joi');
const router = app.Router();
const gemController = require('../controllers/GemController');

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
router.get('/auction',gemController.getAllAuctionGems);
router.get('/direct',gemController.getAllDirectGems);
router.get('/home-gems1',gemController.getThreeAuctionGems);
router.get('/home-gems2',gemController.getThreeDirectGems);
router.get('/home-gems3',gemController.getThreeJewellery);
router.get('/seller-products/:seller_id',gemController.getSellerGems)
router.get('/:id', gemController.getGemProduct);


router.post('/getgem', gemController.getGemDetails);

module.exports = router;
