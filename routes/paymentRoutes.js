// payment router
const app = require('express');
const router = app.Router();
const {v4: uuidv4} = require("uuid");

// payment controller
const paymentController = require('../controllers/PaymentController');

// payment add
//router.post('/addpayment', paymentController.paymentAdd);

router.post('/create-checkout-session', paymentController.payment);


router.post('/paymentverifyemail', paymentController.paymentEmail);

module.exports = router;