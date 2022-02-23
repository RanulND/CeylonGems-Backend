// Gem router
const app = require('express');
const router = app.Router();

// Gem controller
const gemController = require('../controllers/GemController');

// Gem add
router.post('/add', gemController.gemAdd);

//get all gems
router.get('/',gemController.getAllGems);

module.exports = router;