const app = require('express');
const router = app.Router();

//importing Admin Controller
const adminController = require('../controllers/AdminController')
const shared = require('../shared/getAllUsers')
const auctionController = require('../controllers/AuctionController')

//Add admins
router.post('/add-admins', adminController.addAdmin);

//Get all admins
router.get('/get-admins', adminController.getAdmin);

//Remove an Admin
router.post('/remove-admin', adminController.removeAdmin)

router.get('/get-users', shared.getallusers)

router.get('/get-count', adminController.counts)

//get all Auctions
router.get('/get-auctions',auctionController.getAllAuctions);

//get an auction details
router.post('/get-auction', auctionController.getAuctionDetails);

module.exports = router;