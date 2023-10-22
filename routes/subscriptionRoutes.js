const express = require('express');
const router = express.Router();
const paymentGateway = require('../controllers/paymentGateway');
const catchAsync = require('../utils/catchAsync');



router.route('/payment')
    .post(catchAsync(paymentGateway.payment));


module.exports = router;