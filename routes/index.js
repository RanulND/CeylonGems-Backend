const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const AdminRoutes = require('./adminRoutes')
const GemRoutes = require('./gemRoutes');

router.use('/auth', AuthRoutes);
router.use('/admin', AdminRoutes) 
router.use('/gem',GemRoutes)

module.exports = router;