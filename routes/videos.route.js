const express = require("express");
const router = express.Router();
const { getVideoById } = require("../controllers/params");
const { getAllVideos, getVideoDetails } = require("../controllers/videos.controller");

router.get("/", getAllVideos);

router.param("ID", getVideoById);
router.get("/:ID", getVideoDetails);

module.exports = router;