const express = require("express");
const router = express.Router();
const { getAllPlaylist, getPlaylistByName, createPlaylist, removeVideoFromPlaylist, deletePlaylist } = require("../controllers/playlist.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.get("/", getAllPlaylist);
router.get("/:playname", getPlaylistByName);
router.post("/create/:videoId", createPlaylist);
router.delete("/:videoId", removeVideoFromPlaylist);
router.delete("/:playname", deletePlaylist);

module.exports = router;