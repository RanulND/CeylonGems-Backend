// Product router
const app = require('express');
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');
const gemController = require('../controllers/GemController');

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
router.get('/home-gems1',gemController.getThreeAuctionGems);
router.get('/home-gems2',gemController.getThreeDirectGems);
router.get('/home-gems3',gemController.getThreeJewellery);

router.get('/:id', gemController.getProduct);

module.exports = router;
