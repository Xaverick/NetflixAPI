const router = require('express').Router();
const media = require('../controllers/mediaController');

router.route('/media')
    .get(catchAsync(media.getMedia))

router.route('/media/:id')
    .get(catchAsync(media.getMediaById))


module.exports = router;