const app = require('express');
const router = app.Router();

//importing Admin Controller
const adminController = require('../controllers/AdminController')
const shared = require('../shared/getAllUsers')

//Add admins
router.post('/add-admins', adminController.addAdmin);

//Get all admins
router.get('/get-admins', adminController.getAdmin);

//Remove an Admin
router.post('/remove-admin', adminController.removeAdmin)

router.get('/get-users', shared.getallusers)

module.exports = router;