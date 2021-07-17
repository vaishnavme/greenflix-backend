const express = require("express");
const { getLikedVideos, toggleLiked } = require("../controllers/likedVideo.controller");
const router = express.Router();
const { getUserById, getVideoById } = require("../controllers/params");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken)

// router.param("videoID", getVideoById);
// router.param("userId", getUserById);

// likedvideos
router.get("/:userId", getLikedVideos);
router.post("/:videoId", toggleLiked);


module.exports = router;