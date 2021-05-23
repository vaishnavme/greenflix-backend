const { User } = require("../models/user.model");
const { extend } = require("lodash");

const getLikedVideos = async(req, res) => {
    try {
        const { user } = req;
        const collection = user;
        const populateCollection = await collection.populate({
            path: "likedvideos"
        }).execPopulate();

        res.json({
            success: true,
            likedvideos: populateCollection.likedvideos
        })
    } catch(err) {
        res.json({
            success: false,
            message: `Error Occured Error: ${err}`
        })
    }
}

const addToLikedVideos = async(req, res) => {
    try {
        const { user } = req;
        const { videoId } = req.params;

        const updatePlaylists = await User.findById(user._id);
        const addNewVideo = extend (
            updatePlaylists, {
                likedvideos: [videoId, ...updatePlaylists.likedvideos]
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
        await user.likedvideos.pull(videoId);
        user.save();
        res.json({
            success: true,
            likedvideos: user.likedvideos
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = {
    getLikedVideos,
    addToLikedVideos,
    removeVideo
}
