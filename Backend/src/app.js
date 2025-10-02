require("dotenv").config();
const express = require("express");
const songsRoute = require("./routes/song.routes");
const cors = require('cors')
const app = express();
    
app.use(cors());
app.use(express.json());

app.use("/", songsRoute);

module.exports = app;
