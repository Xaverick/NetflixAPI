const dotenv = require('dotenv');
const Season = require('../models/seasonSchema');
const Media = require('../models/mediaModel');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


const mediaData = [
    {
      "title": "Stranger Things",
      "description": "A group of friends in a small town uncover supernatural mysteries when a young boy disappears.",
      "type": "tvshow",
      "genre": ["Science Fiction", "Horror", "Drama"],
      "actors": ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
      "director": ["The Duffer Brothers"],
      "rating": 8.7,
      "release_date": "2016-07-15",
      "image": "https://example.com/stranger-things.jpg",
      "movie_stream": "Netflix",
      "seasons": ["6512fa4d34b6c499089274d6", "6512fd997b343d2798ddf742"]
    },
    {
      "title": "Inception",
      "description": "A mind-bending science fiction film about entering people's dreams.",
      "type": "movie",
      "genre": ["Science Fiction", "Action", "Adventure"],
      "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      "director": ["Christopher Nolan"],
      "rating": 8.8,
      "release_date": "2010-07-16",
      "image": "https://example.com/inception.jpg",
      "movie_stream": "Netflix"
    },
    {
      "title": "The Dark Knight",
      "description": "Batman faces off against the Joker in this action-packed superhero film.",
      "type": "movie",
      "genre": ["Action", "Crime", "Drama"],
      "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      "director": ["Christopher Nolan"],
      "rating": 9.0,
      "release_date": "2008-07-18",
      "image": "https://example.com/the-dark-knight.jpg",
      "movie_stream": "Netflix"
    },
    {
      "title": "The Shawshank Redemption",
      "description": "A man wrongly convicted of murder forms a bond with his fellow inmates in prison.",
      "type": "movie",
      "genre": ["Drama", "Crime"],
      "actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      "director": ["Frank Darabont"],
      "rating": 9.3,
      "release_date": "1994-09-23",
      "image": "https://example.com/shawshank-redemption.jpg",
      "movie_stream": "Netflix"
    },
    {
      "title": "The Godfather",
      "description": "The story of the Corleone crime family in this classic Mafia film.",
      "type": "movie",
      "genre": ["Crime", "Drama"],
      "actors": ["Marlon Brando", "Al Pacino", "James Caan"],
      "director": ["Francis Ford Coppola"],
      "rating": 9.2,
      "release_date": "1972-03-24",
      "image": "https://example.com/the-godfather.jpg",
      "movie_stream": "Netflix"
    },
    {
      "title": "Inception",
      "description": "A mind-bending science fiction film about entering people's dreams.",
      "type": "movie",
      "genre": ["Science Fiction", "Action", "Adventure"],
      "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      "director": ["Christopher Nolan"],
      "rating": 8.8,
      "release_date": "2010-07-16",
      "image": "https://example.com/inception.jpg",
      "movie_stream": "Netflix"
    },
    {
      "title": "The Matrix",
      "description": "A hacker discovers a simulated reality and joins a rebellion against machines.",
      "type": "movie",
      "genre": ["Science Fiction", "Action"],
      "actors": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      "director": ["The Wachowskis"],
      "rating": 8.7,
      "release_date": "1999-03-31",
      "image": "https://example.com/the-matrix.jpg",
      "movie_stream": "Netflix"
    },
    {
      "title": "Breaking Bad",
      "description": "A high school chemistry teacher turns to cooking and selling methamphetamine after a cancer diagnosis.",
      "type": "tvshow",
      "genre": ["Crime", "Drama", "Thriller"],
      "actors": ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
      "director": ["Vince Gilligan"],
      "rating": 9.5,
      "release_date": "2008-01-20",
      "image": "https://example.com/breaking-bad.jpg",
      "movie_stream": "Netflix",
      "seasons": ["6512fa4d34b6c499089274d6", "6512fd997b343d2798ddf742"]
    },

]


const seedDb = async () => {
    await Media.deleteMany({});
    for(let media of mediaData) {
        // const seasons = await Season.find({ tvshow: "strangerthings" });
        // if(media.seasons === undefined) media.seasons = [];
        // else media.seasons.push(...seasons);
        const newmedia = new Media(media);
        await newmedia.save();
    }
 
};

seedDb().then(() =>{
    mongoose.connection.close();
})