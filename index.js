const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const { dbConnection } = require("./db/db.connect");

const videoRouter = require("./routes/videos.route");
const userRouter = require("./routes/user.route");

dbConnection();

app.use("/videos", videoRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("Leafshot video app api...")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}`);
})