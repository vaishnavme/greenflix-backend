const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const { Video } = require("./models/video.models");

app.use(cors());
app.use(express.json());
const { dbConnection } = require("./db/db.connect");

const videoRouter = require("./routes/videos.route");

dbConnection();

app.use("/videos", videoRouter);

app.get("/", (req, res) => {
    res.send("Leafshot video app api...")
})



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}`);
})