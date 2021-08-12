const { WatchLater } = require("../models/watchlater.model");

const getWatchlaters = async(req, res) => {
    try {
        const { user } = req;
        const userWatchLater = await WatchLater.find({user:user.userId}).populate({path: "video"})
        const watchlater = userWatchLater.map((item) => item.video)
        let userPlaylistVideos = {playlistName: "Watch Later", video: [...watchlater]}
        res.json({
            success: true,
            playlistVideos: userPlaylistVideos
        })
    } catch(err) {
        res.json({
            success: false,
            message: `Error Occured Error: ${err}`
        })
    }
}

const toggleWatchLater = async(req, res) => {
    try {
        const { user } = req;
        const { videoId } = req.params;
        const { type } = req.body;

        const videoItem = await WatchLater.findOne({video: videoId, user: user.userId})
        
        if(videoItem) {
            if(type === "REMOVE") {
                const removeVideo = await WatchLater.findOneAndDelete({video: videoId, user: user.userId})
            }
        } else {
            const newWatchLater = new WatchLater({
                user: user.userId,
                video: videoId
            })
            await newWatchLater.save();
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
    getWatchlaters,
    toggleWatchLater
}
