const User = require('../models/userModel');




module.exports.login = (req, res) => {
    res.send('login');
}



module.exports.register = async (req, res) => {
    await User.create({});
}