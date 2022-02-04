const app = require('express');
const router = app.Router();

const AuthRoutes = require('./authRoutes');
const GemRoutes = require('./gemRoutes');
router.use('/auth', AuthRoutes);
router.use('/gem', GemRoutes);

module.exports = router;