const Episode = require('../models/episodeSchema');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


const episodes = [
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 1,
      "episode_title": "Chapter One: The Vanishing of Will Byers",
      "episode_description": "A young boy named Will Byers disappears in a small town, and his friends embark on a quest to find him.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 2,
      "episode_title": "Chapter Two: The Weirdo on Maple Street",
      "episode_description": "The search for Will continues as Eleven's strange abilities are revealed.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 3,
      "episode_title": "Chapter Three: Holly, Jolly",
      "episode_description": "As supernatural occurrences escalate, the town is in turmoil.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 4,
      "episode_title": "Chapter Four: The Body",
      "episode_description": "The kids make a disturbing discovery, and Joyce gets a message from Will.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 5,
      "episode_title": "Chapter Five: The Flea and the Acrobat",
      "episode_description": "Eleven's past is revealed, and the group faces a dangerous showdown.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 6,
      "episode_title": "Chapter Six: The Monster",
      "episode_description": "The group confronts a terrifying creature from another dimension.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 7,
      "episode_title": "Chapter Seven: The Bathtub",
      "episode_description": "The kids try to reach Will using a makeshift sensory deprivation tank.",
      "episode_stream": "Netflix"
    },
    {
      "tvshow_season": "strangerthingsSeason1",
      "episode_number": 8,
      "episode_title": "Chapter Eight: The Upside Down",
      "episode_description": "A final showdown takes place as the group searches for Will in a parallel dimension.",
      "episode_stream": "Netflix"
    }
]
  
// const episodes = [
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 1,
//     "episode_title": "Chapter One: MADMAX",
//     "episode_description": "A new girl with a mysterious past arrives in Hawkins, and a gang of punks causes trouble.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 2,
//     "episode_title": "Chapter Two: Trick or Treat, Freak",
//     "episode_description": "The kids celebrate Halloween, and strange occurrences continue in Hawkins.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 3,
//     "episode_title": "Chapter Three: The Pollywog",
//     "episode_description": "Dustin finds a strange creature, and Eleven ventures out on her own.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 4,
//     "episode_title": "Chapter Four: Will the Wise",
//     "episode_description": "Will's connection to the Upside Down deepens, and a rescue mission is planned.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 5,
//     "episode_title": "Chapter Five: Dig Dug",
//     "episode_description": "Hopper investigates a series of tunnels, and Joyce and Bob face danger.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 6,
//     "episode_title": "Chapter Six: The Spy",
//     "episode_description": "Will's condition worsens, and Eleven discovers a dark secret.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 7,
//     "episode_title": "Chapter Seven: The Lost Sister",
//     "episode_description": "Eleven meets a group of misfits, and she faces a moral dilemma.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 8,
//     "episode_title": "Chapter Eight: The Mind Flayer",
//     "episode_description": "The group confronts a formidable enemy, and the fate of Hawkins hangs in the balance.",
//     "episode_stream": "Netflix"
//   },
//   {
//     "tvshow_season": "strangerthingsSeason2",
//     "episode_number": 9,
//     "episode_title": "Chapter Nine: The Gate",
//     "episode_description": "The final battle against the Shadow Monster takes place, and secrets are revealed.",
//     "episode_stream": "Netflix"
//   }
// ]

const seedDb = async () => {

    for(let episode of episodes) {
        const newEpisode = new Episode(episode);
        await newEpisode.save();
    }
 
};

seedDb().then(() =>{
    mongoose.connection.close();
})