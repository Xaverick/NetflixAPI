const express = require('express')
const app = express();
// require('dotenv').config();

const user = require('./routes/userRoutes');


app.use('/user', user);


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})