const express = require("express");
const router = express.Router();
const { getUserById, getVideoById } = require("../controllers/params");
const { getWatchlaters, addToWatchlater, removeVideo } = require("../controllers/watchlater.controller");

router.param("videoID", getVideoById);
router.param("userId", getUserById);

// likedvideos
router.get("/:userId", getWatchlaters);
router.post("/:userId/:videoId", addToWatchlater);
router.delete("/:userId/:videoId", removeVideo);

module.exports = router;