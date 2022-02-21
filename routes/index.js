const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const GemRoutes = require('./gemRoutes');
const AdminRoutes = require('./adminRoutes')

router.use('/auth', AuthRoutes);
router.use('/gem', GemRoutes);
router.use('/admin', AdminRoutes);

module.exports = router;