const { Video } = require('../models/video.models');

const getAllVideos = async (req, res) => {
    try {
        const video = await Video.find({});
        res.json({
            success: true,
            video
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'unable to fetch data'
        });
    }
};

const getVideoDetails = async (req, res) => {
    const video = req.video;
    res.json({
        success: true,
        video
    });
};

module.exports = {
    getAllVideos,
    getVideoDetails
};
