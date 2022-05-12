const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const AdminRoutes = require('./adminRoutes');
const SellerRoutes = require('./sellerRoutes');
const GetUserRoutes = require('./GetUserRoutes');
const AllUserRoutes = require('./AllUserRoutes');
const GemRoutes = require('./gemRoutes');
const JewelleryRoutes = require('./jewelleryRoutes');
const AuctionRoutes=require('./AuctionRoutes')

router.use('/auth', AuthRoutes);
router.use('/admin', AdminRoutes) 
router.use('/seller', SellerRoutes) 
 router.use('/user', GetUserRoutes) 
 router.use('/user', AllUserRoutes)
 router.use('/gem', GemRoutes);
 router.use('/jewellery',JewelleryRoutes);
 router.use('/auction', AuctionRoutes);




module.exports = router;