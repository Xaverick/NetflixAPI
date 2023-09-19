const router = require('express').Router();
const user  = require('../controllers/userControllers');


router.route('/login')
    .post(user.login)
    
    

router.route('/register')
    .post(user.register)



// router.route('/forgotpassword').post((req, res) => {
//     res.send('forgotpassword');
// });


module.exports = router;