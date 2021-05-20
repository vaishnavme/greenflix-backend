const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const { dbConnection } = require("./db/db.connect");

dbConnection();

app.get("/", (req, res) => {
    res.send("Leafshot video app api...")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}`);
})