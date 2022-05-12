const app = require('express');
const router = app.Router();
const adminController = require('../controllers/AdminController')
const shared = require('../shared/getAllUsers')

router.post('/add-admins', adminController.addAdmin);

router.get('/get-admins', adminController.getAdmin);

router.post('/remove-admin', adminController.removeAdmin)

router.get('/get-users', shared.getallusers)

router.get('/get-count', adminController.counts)

router.post('/get-user', adminController.getUser)

module.exports = router;