// Product router
const app = require('express');
const { required } = require('joi');
const router = app.Router();
const auctionController = require('../controllers/AuctionController');

// Product controller
//const productController = require('../controllers/ProductController');

// Auction add
router.post('/add', auctionController.auctionAdd);

//get all gems
router.get('/',auctionController.getAllAuctions);

router.post('/getauction', auctionController.getAuctionDetails);

module.exports = router;
