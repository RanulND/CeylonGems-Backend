const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
router.use('/auth', AuthRoutes);

module.exports = router;