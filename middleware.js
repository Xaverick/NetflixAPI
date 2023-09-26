const ExpressError = require('./utils/ExpressError');
const User = require('./models/userModel')
const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = async  (req, res, next) => {   
    const token = req.signedCookies.jwt;
    if(token){
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const user = await User.findById(decoded.id);
        if(user) next();
        else res.status(400).json('invalid token');
    }
    else{
        res.status(400).json('no token');
    }
}




