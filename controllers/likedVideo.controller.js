const { LikedVideos } = require('../models/liked.model');

const getLikedVideos = async (req, res) => {
    try {
        const { user } = req;
        const userLikedVideos = await LikedVideos.find({
            user: user.userId
        }).populate({ path: 'video' });
        const likedvideos = userLikedVideos.map((item) => item.video);
        let userPlaylistVideos = {
            playlistName: 'Liked Videos',
            video: [...likedvideos]
        };

        res.json({
            success: true,
            playlistVideos: userPlaylistVideos
        });
    } catch (err) {
        res.json({
            success: false,
            message: `Error Occured Error: ${err}`
        });
    }
};

const toggleLiked = async (req, res) => {
    try {
        const { user } = req;
        const { videoId } = req.params;
        const { type } = req.body;

        const videoItem = await LikedVideos.findOne({
            video: videoId,
            user: user.userId
        });

        if (videoItem) {
            if (type === 'REMOVE') {
                const removeVideo = await LikedVideos.findOneAndDelete({
                    video: videoId,
                    user: user.userId
                });
            }
        } else {
            const newLikedVideo = new LikedVideos({
                user: user.userId,
                video: videoId
            });
            await newLikedVideo.save();
        }

        res.json({
            success: true,
            videoId
        });
    } catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        });
    }
};

const deleteAllLikedVideos = async (req, res) => {
    try {
        const { user } = req;
        await LikedVideos.deleteMany({ user: user.userId });

        res.json({
            success: true
        });
    } catch (err) {
        res.json({
            success: false,
            message: `Error Occured Error: ${err}`
        });
    }
};

module.exports = {
    getLikedVideos,
    toggleLiked,
    deleteAllLikedVideos
};
