const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    name: {
        type: String,
        required: true,
        min: 6,
    },

    email: { 
        type: String,
        required: true,
        max: 255,
    },

    phonenumber: {  
        type: String,   
        required: true,
        min: 10,
    },

    password: { 
        type: String,
        required: true,
        min: 8,
    },

    dob: {
        type: Date,
        required: true,
    },

    isSubscribed: {
        type: Boolean,
        default: false,
    },

});


module.exports = mongoose.model('User', userSchema);