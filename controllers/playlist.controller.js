const { Playlist } = require("../models/playlist.model");
const { User } = require("../models/user.model");

const getAllPlaylist = async(req, res) => {
    const { user } = req;
    try {
        const allPlaylist = await Playlist.find({user: user.userId}).populate({path: "video"});

        res.json({
            success: true,
            allPlaylist
        })

    } catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

const getPlaylistByName= async(req, res) => {
    const { user } = req;
    const { playname } = req.params;
    try {
        const playlist = await Playlist.find({playlistName: playname, user:user.userId}).populate({path: "video"})
        res.json({
            success: true,
            playlist
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

const createPlaylist = async(req, res) => {
    const { user } = req;
    const { videoId } = req.params;
    const { playlistName } = req.body;

    try {
        const newPlaylist = new Playlist({
            playlistName: playlistName,
            user: user.userId,
            video: videoId
        })
        const playlist = await newPlaylist.save();
        res.json({
            success: true,
            playlist
        })
    } catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

const removeVideoFromPlaylist = async(req, res) => {
    const { videoId } = req.params;
    const { playlistName } = req.body;
    try {
        const removedVideo = await Playlist.findOneAndDelete({playlistName: playlistName, video: videoId})
        res.json({
            success: true,
            removedVideo: videoId
        })
    } catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

const deletePlaylist = async(req, res) => {
    const { playname } = req.params;
    try {
        const deletePlaylist = await Playlist.deleteMany({playlistName: playname})
        res.json({
            success: true,
            message: "Playlist deleted"
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

module.exports = {
    getAllPlaylist,
    getPlaylistByName,
    createPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist
}