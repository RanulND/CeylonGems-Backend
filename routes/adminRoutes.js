const app = require('express');
const router = app.Router();

//importing Admin Controller
const adminController = require('../controllers/AdminController')

//Add admins
router.post('/add-admins', adminController.addAdmin);

module.exports = router;