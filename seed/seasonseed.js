const Episode = require('../models/episodeSchema');
const dotenv = require('dotenv');
const Season = require('../models/seasonSchema');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const seasons = [{
    "tvshow": "strangerthings",
    "season_number": 2,
    "episodes": [

    ]
}]



const seedDb = async () => {
    for(let season of seasons) {
        const episodes = await Episode.find({ tvshow_season: "strangerthingsSeason2" });
        season.episodes.push(...episodes);
        const newSeason = new Season(season);
        await newSeason.save();
    }
 
};

seedDb().then(() =>{
    mongoose.connection.close();
})