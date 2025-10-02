const express = require("express");
const multer = require("multer");
const songModel = require("../models/songs.model");
const uploadFile = require("../services/storage.service");
const song = require("../models/songs.model");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const fileData = await uploadFile(req.file);
  const song = await songModel.create({
    title: req.body.title,
    artist: req.body.artist,
    mood: req.body.mood,
    audio: fileData.url,
  });

  console.log(fileData);
  res.status(201).json({
    message: "songs created successfuly",
    song: song,
  });
});

router.get("/songs", async (req, res) => {
  const { mood } = req.query;
  const songs = await songModel.find({
    mood: mood,
  });
  res.status(200).json({
    message: "song fetched successfully",
    songs: songs,
  });
});

module.exports = router;
