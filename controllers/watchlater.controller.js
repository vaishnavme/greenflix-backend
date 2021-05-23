const { User } = require("../models/user.model");
const { extend } = require("lodash");

const getWatchlaters = async(req, res) => {
    try {
        const { user } = req;
        const collection = user;
        const populateCollection = await collection.populate({
            path: "watchlater"
        }).execPopulate();

        res.json({
            success: true,
            watchlater: populateCollection.watchlater
        })
    } catch(err) {
        res.json({
            success: false,
            message: `Error Occured Error: ${err}`
        })
    }
}

const addToWatchlater = async(req, res) => {
    try {
        const { user } = req;
        const { videoId } = req.params;
        console.log("user", user);
        console.log("vid",videoId);
        const updatePlaylists = await User.findById(user._id);
        const addNewVideo = extend (
            updatePlaylists, {
                watchlater: [videoId, ...updatePlaylists.watchlater]
            }
        )
        const newResponse = await addNewVideo.save();
        console.log(addNewVideo)
        res.json({
            success: true,
            newResponse
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const removeVideo = async(req, res) => {
    try {
        const { user } = req;
        const { videoId } = req.params;
        await user.watchlater.pull(videoId);
        user.save();
        res.json({
            success: true,
            watchlater: user.watchlater
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = {
    getWatchlaters,
    addToWatchlater,
    removeVideo
}
