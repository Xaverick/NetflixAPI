const mongoose = require('mongoose');
const schema = mongoose.Schema;
const media = require('./mediaModel');

const userRecommendSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    movie : [
        {
            type: schema.Types.ObjectId,
            ref: 'media',
        }
    ],

});

module.exports = mongoose.model('userRecommend', userRecommendSchema);
