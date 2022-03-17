const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const GemRoutes = require('./gemRoutes');
const AdminRoutes = require('./adminRoutes');
const JewelleryRoutes = require('./jewelleryRoutes');

router.use('/auth', AuthRoutes);
router.use('/gem', GemRoutes);
router.use('/admin', AdminRoutes);
router.use('/jewellery',JewelleryRoutes);

module.exports = router;