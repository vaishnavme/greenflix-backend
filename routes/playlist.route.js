const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
    getLikedVideos,
    toggleLiked,
    deleteAllLikedVideos
} = require('../controllers/likedVideo.controller');
const {
    getWatchlaters,
    toggleWatchLater,
    deleteAllWatchLater
} = require('../controllers/watchlater.controller');
const {
    getAllUserPlaylist,
    getPlaylistById,
    createNewPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist
} = require('../controllers/playlist.controller');

router.use(verifyToken);

// liked video
router.get('/liked', getLikedVideos);
router.post('/liked/:videoId', toggleLiked);
router.delete('/liked', deleteAllLikedVideos);

// watchlater video
router.get('/watch/', getWatchlaters);
router.post('/watch/:videoId', toggleWatchLater);
router.delete('/watch', deleteAllWatchLater);

// custom playlist
router.get('/', getAllUserPlaylist);
router.get('/:playlistId', getPlaylistById);
router.post('/create/:videoId', createNewPlaylist);
router.post('/:playlistId/:videoId', addVideoToPlaylist);
router.delete('/:playlistId/:videoId', removeVideoFromPlaylist);
router.delete('/:playlistId', deletePlaylist);

module.exports = router;
