const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const ExpressError = require('./utils/ExpressError');
const cookieParser = require('cookie-parser');


const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


app.use(cors({ origin: true, credentials: true}));
app.use (cookieParser(process.env.SECRET));
app.use(express.json());


const user = require('./routes/userRoutes');
app.use('/user', user);

const media = require('./routes/mediaRoutes');
app.use('/data', media);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).json({ message });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})