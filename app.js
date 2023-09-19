const express = require('express')
const app = express();
require('dotenv').config();


const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));




const user = require('./routes/userRoutes');
app.use('/user', user);




app.listen(3000, () => {
    console.log('Server is running on port 3000')
})