const schema = require('mongoose').Schema;
const Episode = require('./episodeSchema');

const seasonSchema = new schema({
    season_number: {
        type: Number,
        required: true,
    },
    episodes: [
        {
            type: schema.Types.ObjectId,
            ref: 'Episode',
        }
    ],
});


module.exports = mongoose.model('Season', seasonSchema);