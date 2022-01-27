const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const AdminRoutes = require('./adminRoutes')

router.use('/auth', AuthRoutes);
router.use('/admin', AdminRoutes) 

module.exports = router;