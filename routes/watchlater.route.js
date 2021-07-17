const express = require("express");
const router = express.Router();
const { getWatchlaters, toggleWatchLater } = require("../controllers/watchlater.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.get("/", getWatchlaters);
router.post("/:videoId", toggleWatchLater);

module.exports = router;