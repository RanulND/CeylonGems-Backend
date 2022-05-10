// Product router
const app = require("express");
const router = app.Router();

// Product controller
const productController = require('../controllers/ProductController');
const gemController = require('../controllers/GemController')

// Gem add
router.post('/add', productController.gemAdd);
//Get gem type
router.post('/type', productController.gemType);
router.get('/get/gem-type', productController.getGemType);
// Edit gem details
router.put('/edit/:detailId', productController.updateGem);
//Get product details
router.post('/details/:detailId', productController.getProductDetails);

//get all gems
router.get('/',gemController.getAllGems);
router.get('/home-gems',gemController.getThreeAuctionGems);
router.get('/home-gems',gemController.getThreeDirectGems);

router.get('/:id', gemController.getProduct);

module.exports = router;
