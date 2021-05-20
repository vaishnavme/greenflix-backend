const express = require("express");
const router = express.Router();
const { getVideos } = require("../controllers/videos.controller");

router.get("/", getVideos);


module.exports = router;