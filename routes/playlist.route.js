const express = require("express");
const router = express.Router();
const { getUserById, getVideoById } = require("../controllers/params");
const { createNewPlaylist, addToPlaylist } = require("../controllers/playlist.controller");

router.param("videoID", getVideoById);
router.param("userId", getUserById);

router.post("/:userId", createNewPlaylist);
router.post("/:userId/:videoID", addToPlaylist);

module.exports = router;