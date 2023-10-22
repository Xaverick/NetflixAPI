const User = require('../models/userModel'); 
const Razorpay = require('razorpay');



module.exports.payment = async (req, res) => {
    const {id} = req.body;
    // const instance = new Razorpay({
    //     key_id: 'YOUR_KEY_ID',
    //     key_secret: 'YOUR_SECRET'
    // })

    // const options = {
    //     amount: Number(req.amount*100),  // amount in the smallest currency unit
    //     currency: "INR",

    // };

    //     instance.orders.create(options, function(err, order) {
    //     console.log(order);
    // });


    const user = await User.findById({_id: id});
    if(!user) res.status(400).json({message: 'User not found'});
    
    else{
        user.subscription_status = true;
        user.save();
        res.status(200).json({message: 'Payment Successful'});
    }

}

