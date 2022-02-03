// Gem router
const app = require('express');
const router = app.Router();

// Gem controller
const gemController = require('../controllers/GemController');

// Gem add
router.post('/gem/add-gem', gemController.gemAdd);

module.exports = router;