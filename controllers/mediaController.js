const media = require('../models/mediaModel');


module.exports.getMedia = async (req, res) => {
    const mediaList = await media.find();
    res.json(mediaList);
}


module.exports.getMediaById = async (req, res) => {
    const mediaItem = await media.findById(req.params.id);
    res.json(mediaItem);
}