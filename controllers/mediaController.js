const media = require('../models/mediaModel');
const user = require('../models/userModel');
const recommend = require('../models/recommendModel');

module.exports.getMedia = async (req, res) => {
    const mediaList = await media.find();
    res.json(mediaList);
}


module.exports.getMediaById = async (req, res) => {
    const mediaItem = await media.findById(req.params.id);
    res.json(mediaItem);
}


module.exports.getWatchlist = async (req, res) => {
    const {id} = req.params;
    const userWatchlist = await user.findById(id).populate('watch_list');
    res.json(userWatchlist.watch_list);

}


module.exports.addToWatchlist = async (req, res) => {
    const {mediaid , id} = req.params;
    const userWatchlist = await user.findById(id).populate('watch_list');
    if(!(userWatchlist.watch_list.includes(mediaid))) res.status(400).json("already in watchlist");
    else{
        userWatchlist.watch_list.push(mediaid);
        await userWatchlist.save();
        res.status(200).json("added to watchlist");
    }

}


module.exports.removeFromWatchlist = async (req, res) => {
    const {mediaid , id} = req.params;
    const userWatchlist = await user.findById(id).populate('watch_list');
    userWatchlist.watch_list.pull(mediaid);
    await userWatchlist.save();
    res.json("removed from watchlist");
}


module.exports.contentStream = async (req, res) => {
    const {mediaid , id} = req.params;
    const Currentuser = await user.findById(id).populate('history');
    Currentuser.history.push(mediaid);
    await Currentuser.save();
    res.status(200).json("added to history");
}

module.exports.getHistory = async (req, res) => {
    const {id} = req.params;
    const userHistory = await user.findById(id).populate('history');
    res.json(userHistory.history);
}


module.exports.removeFromHistory = async (req, res) => {
    const {mediaid , id} = req.params;
    const userHistory = await user.findById(id).populate('history');
    userHistory.history.pull(mediaid);
    await userHistory.save();
    res.json("removed from history");
}

module.exports.search = async (req, res) => {
    const {search} = req.params;
    const mediaList = await media.find({title: {$regex: search, $options: 'i'}}); // Case insensitive search
    res.json(mediaList);
}


module.exports.recommend = async (req, res) => {
    const {id} = req.params;
    const Currentuser = await user.findById(id);
    const userHistory = Currentuser.history;
    const userWatchlist = Currentuser.watch_list;
    for(let data of userHistory){
        const movieData = await media.findById(data._id);
        const genre = movieData.genre[0];
        console.log(genre);
        const genreData = await media.find({genre: genre});        
        for(let movie of genreData){
            if(!(userWatchlist.includes(movie._id)) && !(userHistory.includes(movie._id))){
                const userRecommend = await recommend.findOne({user: id})
                if(userRecommend){
                    if(!(userRecommend.movie.includes(movie._id))){
                        userRecommend.movie.push(movie._id);
                        await userRecommend.save();
                    }

                }
                else{
                    const recommends = new recommend({
                        user: id,
                        movie: movie._id
                    });
                    await recommends.save();
                }
            }
            
        }
    }
    
    for(let data of userWatchlist){
        const movieData = await media.findById(data._id);
        const genre = movieData.genre[0];
        console.log(genre);
        const genreData = await media.find({genre: genre});        
        for(let movie of genreData){
            if(!(userWatchlist.includes(movie._id)) && !(userHistory.includes(movie._id))){
                const userRecommend = await recommend.findOne({user: id})
                if(userRecommend){
                    if(!(userRecommend.movie.includes(movie._id))){
                        userRecommend.movie.push(movie._id);
                        await userRecommend.save();
                    }

                }
                else{
                    const recommends = new recommend({
                        user: id,
                        movie: movie._id
                    });
                    await recommends.save();
                }
            }
            
        }
    }

    const recommendedMovies = await recommend.find({user: id}).populate('movie');
    res.status(200).json(recommendedMovies);
    console.log(recommendedMovies);
}



 