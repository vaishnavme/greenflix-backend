const { LikedVideos } = require("../models/liked.model");
const { User } = require("../models/user.model");

const getLikedVideos = async(req, res) => {
    try {
        const { user } = req;
        const userLikedVideos = await LikedVideos.find({user:user.userId}).populate({path: "video"})
        res.json({
            success: true,
            userLikedVideos
        })
    } catch(err) {
        res.json({
            success: false,
            message: `Error Occured Error: ${err}`
        })
    }
}

const toggleLiked = async(req, res) => {
    try {
        const { user } = req;
        const { videoId } = req.params;
        const { type } = req.body;

        const videoItem = await LikedVideos.findOne({video: videoId, user: user.userId})
        
        if(videoItem) {
            if(type === "REMOVE") {
                const removeVideo = await LikedVideos.findOneAndDelete({video: videoId, user: user.userId})
            }
        } else {
            const newLikedVideo = new LikedVideos({
                user: user.userId,
                video: videoId
            })
            await newLikedVideo.save();
        } 
        
        res.json({
            success: true,
            videoId
        })
    } catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

module.exports = {
    getLikedVideos,
    toggleLiked
}
