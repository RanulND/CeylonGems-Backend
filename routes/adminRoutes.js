const app = require('express');
const router = app.Router();
const adminController = require('../controllers/AdminController')
const shared = require('../shared/getAllUsers')
const auctionController = require('../controllers/AuctionController')
const productController = require('../controllers/ProductController')

router.post('/add-admins', adminController.addAdmin);

router.get('/get-admins', adminController.getAdmin);

router.post('/remove-admin', adminController.removeAdmin)

//Get not verified gems
router.get('/get-non-verified', productController.getNonVerified)

router.get('/get-users', shared.getallusers)

router.get('/get-count', adminController.counts)

router.post('/get-user', adminController.getUser)
//get all Auctions
router.get('/get-auctions',auctionController.getAllAuctions);

//get an auction details
router.post('/get-auction', auctionController.getAuctionDetails);

module.exports = router;