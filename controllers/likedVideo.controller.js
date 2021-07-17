const { User } = require("../models/user.model");

const getLikedVideos = async(req, res) => {
    try {
        const { user } = req;

        const userAccount = await User.findById(user.userId).populate({path: "likedvideos"})

        res.json({
            success: true,
            likedvideos: userAccount.likedvideos
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

        const userAccount = await User.findById(user.userId);

        if(type === "REMOVE") {
            await userAccount.likedvideos.pull(videoId);
            userAccount.save();
        } else {
            if(userAccount) {
                userAccount.likedvideos.push(videoId)
                await userAccount.save();
            } 
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
