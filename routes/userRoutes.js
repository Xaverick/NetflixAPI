const router = require('express').Router();
const user  = require('../controllers/userControllers');
const catchAsync = require('../utils/catchAsync');

router.route('/login')
    .post(catchAsync(user.login));
    
    

router.route('/register')
    .post(catchAsync(user.register));



// router.route('/forgotpassword').post((req, res) => {
//     res.send('forgotpassword');
// });


module.exports = router;