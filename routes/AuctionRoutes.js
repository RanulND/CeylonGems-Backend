// Product router
const app = require('express');
const router = app.Router();
const auctionController = require('../controllers/AuctionController');

// Auction add
router.post('/add', auctionController.auctionAdd);

//get all gems
router.get('/',auctionController.getAllAuctions);

router.post('/getauction', auctionController.getAuctionDetails);

module.exports = router;
