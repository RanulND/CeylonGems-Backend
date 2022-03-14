// Gem router
const app = require('express');
const router = app.Router();

// Gem controller
const gemController = require('../controllers/GemController');

// Gem add
router.post('/add', gemController.gemAdd);

//get all gems
router.get('/',gemController.getAllGems);
router.get('/home-gems',gemController.getThreeAuctionGems);
router.get('/home-gems',gemController.getThreeDirectGems);

router.get('/:id', gemController.getProduct);

module.exports = router;
