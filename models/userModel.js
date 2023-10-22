const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        min: 6,
    },

    email: { 
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255,

    },

    password: { 
        type: String,
        required: true,
        min: 8,
    },

    subscription_status: {
        type: Boolean,
        default: false,
    },

    watch_list : [
        {
            type: schema.Types.ObjectId,
            ref: 'media',
            
        },
    ],
    

    history: [
        {
            type: schema.Types.ObjectId,
            ref: 'media',
        }
    ]

});


module.exports = mongoose.model('User', userSchema);