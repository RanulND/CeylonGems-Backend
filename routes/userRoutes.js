
const app = require('express');
const router = app.Router();
const shared = require('../shared/getAllUsers')

//importing Seller Controller
const userController = require('../controllers/UserController')

router.get('/getAllUsers', shared.getallusers);
router.post('/getuser', userController.getUserDetails);

router.post('/getuserbyId', userController.getUserById);

module.exports = router;