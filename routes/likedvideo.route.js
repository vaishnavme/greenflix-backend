const express = require("express");
const { getLikedVideos, toggleLiked } = require("../controllers/likedVideo.controller");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.get("/", getLikedVideos);
router.post("/:videoId", toggleLiked);


module.exports = router;