const mongoose = require('mongoose');
const schema = mongoose.Schema;

const episodeSchema = new schema({
    episodes: [
        {
            episode_number: {
                type: Number,
                required: true,
            },

            episode_title: {
                    type: String,
                    required: true,
            },

            episode_description: {
                    type: String,
                    required: true,
            },

            episode_stream: {
                    type: String,
                    required: true,
            },

            
        },

    ] 
});

module.exports = mongoose.model('Episode', episodeSchema);
