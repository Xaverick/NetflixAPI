const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Season = require('./seasonSchema');


const mediaSchema = new schema({

    title: {
        type: String,
        required: true,
        min: 6,
    },
    
    description: { 
        type: String,
        required: true,
    },

    type: { 
        type: String,
        required: true,
        min: 8,
    },

    genre: [
        {
            type: String,
            required: true,
        }
    ],

    actors: [
        {
            type: String,
            required: true,
        }
    ],

    director: [
        {
            type: String,
            required: true,
        }
    ],

    rating: {
        type: Number,
        required: true,
    },

    release_date: {
        type: Date,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    
    movie_stream: {
        type: String,     
    },

    seasons : [
        {
            type: schema.Types.ObjectId,
            ref: 'Season',
        }                           
    ],


});

module.exports = mongoose.model('media', mediaSchema);