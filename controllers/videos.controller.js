const { Video } = require("../models/video.models");

const getVideos = async(req, res) => {
    try {
        const video = await Video.find({});
        res.json({
            success: true,
            video
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "unable to fetch data"
        })
    }
}

module.exports = {
    getVideos
}