const { User } = require("../models/user.model");
const { extend } = require("lodash");

const createNewPlaylist = async(req, res) => {
    try {
        const { user } = req;
        const { playlist } = req.body;

        const userInstance = await User.findById(user._id);
        const isPlaylistExist = userInstance.playlist.find((prevName) => prevName.name === playlist.name);
       
        if(isPlaylistExist) {
            return res.json({
                success: false,
                message: "Playlist already exists"
            })
        } else {
            const newPlaylist = extend(userInstance, {
                playlist: [playlist, ...userInstance.playlist]
            })
            await newPlaylist.save();
        }
        const newResponse = userInstance.playlist

        res.json({
            success: true,
            newResponse
        })
    } catch(err) {
        res.json({
            success: false,
            message: `Error Occured: Error: ${err}`
        })
    }
}

const addToPlaylist = async(req, res) => {
    try {
        const { user } = req;
        const { videoID } = req.params;
        const { playlist } = req.body;

        const userInstance = await User.findById(user._id);
        const userPlaylists = userInstance.playlist.find((prevName) => prevName.name === playlist.name);

        if(userPlaylists.videos.indexOf(videoID) !== -1) {
            return res.json({
                success: false,
                message: "Video already exist in playlist"
            })
        }

        const updatePlaylist = extend(userPlaylists, {
            videos: [...userPlaylists.videos, playlist.videos]
        })
        
        const updateAllPlaylist = extend(userInstance.playlist, {
            _id: updatePlaylist._id,
            name: updatePlaylist.name,
            videos: updatePlaylist.videos
        })

        const updateUserPlylistData = extend(userInstance, {
            playlist: updateAllPlaylist
        })
        const newResponse = await updateUserPlylistData.save();
        
        res.json({
            success: true,
            newResponse
        })

    } catch(err) {
        res.json({
            success: false,
            message: `Error Occured: Error: ${err}`
        })
    }
}

module.exports = {
    createNewPlaylist,
    addToPlaylist
}