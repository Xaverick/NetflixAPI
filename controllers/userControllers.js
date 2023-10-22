const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

module.exports.login = async (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) res.status(400).json('missing fields');
    else{
        email = email.toLowerCase();
        const user = await User.findOne({ email: email});
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, `${process.env.SECRET}`, { expiresIn: '1h' });
            res.cookie('jwt', token, { signed: true,httpOnly: true ,maxAge: 1000 * 60 * 60 }).json('login');
        } 
        else {
            res.status(400).json('login failed');
        }
    }
}



module.exports.register = async (req, res) => {
    let { username, email, password } = req.body;
    email = email.toLowerCase();
    const registeredEmail = await User.findOne({email: email});

    if(registeredEmail){
        res.status(400).json('email already exists');
    }

    else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await User.create({username, email, password: hash});
        res.json('register');
    }
}


module.exports.logout = (req, res) => {
    res.clearCookie('jwt').json('logout');
};


module.exports.profile = async (req, res) => {
    const token = req.signedCookies.jwt;
    if(token){
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const user = await User.findById(decoded.id);
        res.json(user);
    }
    else{
        res.status(400).json('no token');
    }
}


module.exports.forgotPassword = async (req, res) => {
    const { email} = req.body;
    const user = await User.findOne({email: email});
    if(user){
        const secret = `${process.env.SECRET}${user.password}`;
        const token = jwt.sign({ id: user._id } , secret , { expiresIn: '5m' });
        // const link = `${clientLink}/resetpassword/${user._id}/${token}`;
        // const link = `http://localhost:3000/user/resetpassword/${user._id}/${token}`;
        // res.json(link);
        //sending Email to the user Gmail

        let config = {
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASSWORD}`
            }
        };
        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'MyApp',
                link: 'https://mailgen.js/'
            }

        });

        var response = {
            body: {
                name: 'John Appleseed',
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Click here',
                        link: `http://localhost:3000/user/resetpassword/${user._id}/${token}`
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };

        var emailBody = MailGenerator.generate(response);
        let message = {
            from: `${process.env.EMAIL}`,
            to: `${email}`,
            subject: 'Password Reset Request',
            html: emailBody
        };

        transporter.sendMail(message)
        .then(() => res.status(201).json('email sent'))
        .catch((err) => res.status(400).json(err));
        
    } 
    else{
        res.status(400).json('email not registered');
    }
}


module.exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await User.findById(id);
    if(!oldUser){
        res.status(400).json('user not found');
    }
    else{
        const secret = `${process.env.SECRET}${oldUser.password}`;
        if(jwt.verify(token,secret)){
            oldUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            await oldUser.save();
            res.json('password changed');
        }
        else{
            res.status(400).json('invalid token');
        }
    }

}
