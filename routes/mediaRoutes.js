const router = require('express').Router();
const media = require('../controllers/mediaController.js');
const { isLoggedIn } = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');

router.route('/media')
    .get(isLoggedIn,catchAsync(media.getMedia))


router.route('/media/:id')
    .get(isLoggedIn, catchAsync(media.getMediaById))


    
module.exports = router;