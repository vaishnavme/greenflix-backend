const { User } = require("../models/user.model");

const getWatchlaters = async(req, res) => {
    try {
        const { user } = req;
        const userAccount = await User.findById(user.userId).populate({path: "watchlater"})

        res.json({
            success: true,
            watchlater: userAccount.watchlater
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

        const userAccount = await User.findById(user.userId);

        if(type === "REMOVE") {
            await userAccount.watchlater.pull(videoId);
            userAccount.save();
        } else {
            if(userAccount) {
                userAccount.watchlater.push(videoId)
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
    getWatchlaters,
    toggleWatchLater
}
