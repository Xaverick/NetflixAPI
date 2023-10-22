const router = require('express').Router();
const media = require('../controllers/mediaController.js');
const { isLoggedIn, isSubscribed } = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');

router.route('/media')
    .get(isLoggedIn,catchAsync(media.getMedia))


router.route('/media/:id')
    .get(isLoggedIn, catchAsync(media.getMediaById))


router.route('/media/watchlist/:id')
    .get(isLoggedIn, catchAsync(media.getWatchlist))

router.route('/media/watchlist/:mediaid/:id')
    .post(isLoggedIn, isSubscribed, catchAsync(media.addToWatchlist))
    .get(isLoggedIn, isSubscribed, catchAsync(media.removeFromWatchlist))


router.route('/media/stream/:mediaid/:id')     
    .post(isLoggedIn, isSubscribed , catchAsync(media.contentStream)) //whenever a user watches something it is added to history


router.route('/media/history/:id')
    .get(isLoggedIn, catchAsync(media.getHistory))

router.route('/media/history/:id/:mediaid')
    .post(isLoggedIn, catchAsync(media.removeFromHistory))


router.route('/media/search/:search')
    .get(isLoggedIn, catchAsync(media.search))


router.route('/media/recommend/:id')
    .get(isLoggedIn, isSubscribed, catchAsync(media.recommend))



module.exports = router;