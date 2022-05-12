// Product router
const app = require('express');
const { required } = require('joi');
const router = app.Router();
const auctionController = require('../controllers/AuctionController');

// Product controller
//const productController = require('../controllers/ProductController');

// Auction add
router.post('/add', auctionController.auctionAdd);
//Get gem type
//router.post('/type', productController.gemType);
// Edit gem details
//router.put('/edit',productController.updateGem);
//Get product details
//router.post('/details/:detailId',productController.getProductDetails);

//get all gems
router.get('/',auctionController.getAllAuctions);
// router.get('/home-gems',gemController.getThreeAuctionGems);
// router.get('/home-gems',gemController.getThreeDirectGems);

//router.get('/:id', gemController.getProduct);

router.post('/getauction', auctionController.getAuctionDetails);

module.exports = router;
