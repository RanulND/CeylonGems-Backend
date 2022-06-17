// Bid router
const app = require('express');
const router = app.Router();
const bidController = require('../controllers/BidController');

// Add Bid
router.post('/addbid', bidController.bidAdd);

//get all bids by auctionId
router.post('/getbids',bidController.getAllBidsByAuctionId);

//set winning bid
router.post('/winningbid', bidController.setWinningBid);

//get all bids of buyer
router.post('/buyerbids', bidController.getAllBidsByBuyer);

module.exports = router;
