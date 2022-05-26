const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const AdminRoutes = require('./adminRoutes');
const UserRoutes = require('./userRoutes');
const GemRoutes = require('./gemRoutes');
const JewelleryRoutes = require('./jewelleryRoutes');
const AuctionRoutes=require('./AuctionRoutes')
const CartRoutes = require('./cartRoutes');
const OrderRoutes = require('./OrderRoutes');

router.use('/auth', AuthRoutes);
router.use('/admin', AdminRoutes) 
 router.use('/user', UserRoutes) 
 router.use('/gem', GemRoutes);
 router.use('/jewellery',JewelleryRoutes);
 router.use('/auction', AuctionRoutes);
 router.use('/cart', CartRoutes )
 router.use('/order', OrderRoutes);

module.exports = router;