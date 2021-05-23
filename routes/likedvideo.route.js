const express = require("express");
const { addToLikedVideos, getLikedVideos, removeVideo } = require("../controllers/likedVideo.controller");
const router = express.Router();
const { getUserById, getVideoById } = require("../controllers/params");

router.param("videoID", getVideoById);
router.param("userId", getUserById);

// likedvideos
router.get("/:userId", getLikedVideos);
router.post("/:userId/:videoId", addToLikedVideos);
router.delete("/:userId/:videoId", removeVideo);

module.exports = router;