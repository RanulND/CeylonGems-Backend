const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const GemRoutes = require('./gemRoutes');
const AdminRoutes = require('./adminRoutes');
const JewelleryRoutes = require('./jewelleryRoutes');
const CartRoutes = require('./cartRoutes');

router.use('/auth', AuthRoutes);
router.use('/gem', GemRoutes);
router.use('/admin', AdminRoutes);
router.use('/jewellery',JewelleryRoutes);
router.use('/cart', CartRoutes )

module.exports = router;