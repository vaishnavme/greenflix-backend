const { Playlist } = require('../models/playlist.model');
const { User } = require('../models/user.model');
const { Video } = require('../models/video.models');

const populatePlaylist = {
    path: 'playlists',
    select: '_id playlistName',
    populate: {
        path: 'video'
    }
};

const getAllUserPlaylist = async (req, res) => {
    const { user } = req;
    try {
        const userAccount = await User.findById(user.userId).populate(
            populatePlaylist
        );

        res.json({
            success: true,
            playlists: userAccount.playlists
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

const getPlaylistById = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId).populate({
            path: 'video'
        });

        res.json({
            success: true,
            playlistVideos: playlist
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

const createNewPlaylist = async (req, res) => {
    const { user } = req;
    const { videoId } = req.params;
    const { playlistName } = req.body;
    try {
        const userAccount = await User.findById(user.userId);

        const newPlaylist = new Playlist({
            playlistName: playlistName,
            creator: user.userId,
            video: videoId
        });
        const playlist = await newPlaylist.save();
        userAccount.playlists.push(playlist._id);
        await userAccount.save();
        const response = await Playlist.findById(playlist._id).populate({
            path: 'video'
        });
        res.json({
            success: true,
            playlist: response
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

const addVideoToPlaylist = async (req, res) => {
    const { playlistId, videoId } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist)
            return res.status(404).json({
                success: false,
                message: 'Playlist not found'
            });

        playlist.video.push(videoId);
        await playlist.save();
        res.json({
            success: true,
            message: 'Video Added',
            playlistId,
            videoId
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

const removeVideoFromPlaylist = async (req, res) => {
    const { playlistId, videoId } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId);

        playlist.video.splice(playlist.video.indexOf(videoId), 1);
        await playlist.save();

        res.json({
            success: true,
            message: 'Video removed',
            playlistId,
            videoId
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

const deletePlaylist = async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;
    try {
        const userAccount = await User.findById(user.userId);
        const playlist = await Playlist.findByIdAndDelete(playlistId);

        userAccount.playlists.splice(
            userAccount.playlists.indexOf(playlistId),
            1
        );
        await userAccount.save();

        res.json({
            success: true,
            message: 'Playlist is deleted',
            playlistId
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

module.exports = {
    getAllUserPlaylist,
    getPlaylistById,
    createNewPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist
};
