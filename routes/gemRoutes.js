// Product router
const app = require('express');
const { required } = require('joi');
const router = app.Router();
const gemController = require('../controllers/GemController');

// Product controller
const productController = require('../controllers/ProductController');
const gemController = require('../controllers/GemController')

// Gem add
router.post('/add', productController.gemAdd);
//Get gem type
router.post('/type', productController.gemType);
// Edit gem details
router.put('/edit',productController.updateGem);
//Get product details
router.post('/details/:detailId',productController.getProductDetails);

//get all gems
router.get('/',gemController.getAllGems);
router.get('/home-gems',gemController.getThreeAuctionGems);
router.get('/home-gems',gemController.getThreeDirectGems);

router.get('/:id', gemController.getProduct);

router.post('/getgem', gemController.getGemDetails);

module.exports = router;
