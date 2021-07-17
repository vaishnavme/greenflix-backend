const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const { dbConnection } = require("./db/db.connect");

const videoRouter = require("./routes/videos.route");
const userRouter = require("./routes/user.route");
const playlistRouter = require("./routes/playlist.route");

const errorHandler = require("./middleware/errorHandler");
const routeHandler = require("./middleware/routeHandler");

dbConnection();

app.use("/videos", videoRouter);
app.use("/user", userRouter);
app.use("/playlist", playlistRouter);

app.get("/", (req, res) => {
    res.send("Leafshot video app api...")
})

//middleware
app.use(routeHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}`);
})