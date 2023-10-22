const router = require('express').Router();
const user  = require('../controllers/userControllers');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware.js');

router.route('/login')
    .post(catchAsync(user.login));
    
    
router.route('/register')
    .post(catchAsync(user.register));


router.route('/logout')
    .get(catchAsync(user.logout));


router.route('/forgotpassword')
    .post(catchAsync(user.forgotPassword));


router.route('/resetpassword/:id/:token')
    .post(catchAsync(user.resetPassword));


router.route('/profile')
    .get(isLoggedIn,catchAsync(user.profile));




module.exports = router;