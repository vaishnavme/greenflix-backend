const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getLikedVideos, toggleLiked } = require("../controllers/likedVideo.controller");
const { getWatchlaters, toggleWatchLater } = require("../controllers/watchlater.controller");
const { getAllUserPlaylist, getPlaylistById, createNewPlaylist, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist } = require("../controllers/playlist.controller");

router.use(verifyToken);

// liked video
router.get("/liked", getLikedVideos);
router.post("/liked/:videoId", toggleLiked);

// watchlater video
router.get("/watch/", getWatchlaters);
router.post("/watch/:videoId", toggleWatchLater);

// custom playlist
router.get("/", getAllUserPlaylist);
router.get("/:playlistId", getPlaylistById);
router.post("/create/:videoId", createNewPlaylist);
router.post("/:playlistId/:videoId", addVideoToPlaylist);
router.delete("/:playlistId/:videoId", removeVideoFromPlaylist);
router.delete("/:playlistId", deletePlaylist);

module.exports = router;