const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const AdminRoutes = require('./adminRoutes');
const SellerRoutes = require('./sellerRoutes');
const productRoutes = require('./productRoutes');


router.use('/auth', AuthRoutes);
router.use('/admin', AdminRoutes) 
router.use('/seller', SellerRoutes) 
// router.use('/product', productRoutes) 

module.exports = router;