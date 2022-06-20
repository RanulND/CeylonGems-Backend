// Product router
const app = require('express');
const router = app.Router();
const auctionController = require('../controllers/AuctionController');

// Auction add
router.post('/add', auctionController.auctionAdd);

// Edit auction details
router.put('/edit',auctionController.updateAuction);

//get all Auctions
router.get('/getAllAuction',auctionController.getAllAuctions);

router.post('/getauction', auctionController.getAuctionDetails);
router.get('/getAuctionsByDate', auctionController.getAuctionsByDate)

//get all bids
// router.get('/Get',auctionController.getAllBids);

module.exports = router;
